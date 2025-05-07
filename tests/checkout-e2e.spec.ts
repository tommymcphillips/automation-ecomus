import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { MyAccount } from '../pages/my-account.page';
import { ProductPage } from '../pages/product.page';
import { CheckoutPage } from '../pages/checkout.page';
import { UserApiClient } from '../api-clients/user.api-client';
import { OrderApiClient } from '../api-clients/order.api-client';

const testEmail = 'tommy10@outlook.cl';
const testEmail2 = 'tommy11@outlook.cl';
const authToken = 'mi-token-super-secreto';

test.beforeAll(async ({ request }) => {
  const userApi = new UserApiClient(request);

  for (const email of [testEmail, testEmail2]) {
    const user = await userApi.findUserByEmail(email);

    if (user?.id) {
      const deletedUser = await userApi.deleteUserById(user.id, authToken);
      console.log(`Usuario ${email} eliminado:`, deletedUser);
    } else {
      console.log(`Usuario ${email} no encontrado.`);
    }
  }
});

test.afterEach(async ({ request }) => {
  const userApi = new UserApiClient(request);
  const user = await userApi.findUserByEmail(testEmail);

  console.log('Usuario encontrado:', user.id);

  if (user.id) {
    const deletedUser = await userApi.deleteUserById(user.id, authToken);
    console.log('Usuario eliminado:', deletedUser);
  } else {
    console.log('No se encontró el usuario para eliminar');
  }
});

test.describe('@e2e', () => {
  test('doing a checkout e2e successfully', async ({ page, request }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    const myAccount = new MyAccount(page);
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);
    const orderApi = new OrderApiClient(request);

    await homePage.goto();
    await homePage.clikKeepMeUpdatedModalCloseButton();
    await homePage.clickProfileIcon();
    await loginPage.clickNewCustomerButton();
    await registerPage.fillFormRegister('tommmy', 'mcphillips', testEmail, '123456');
    await loginPage.login(testEmail, '123456');
    await myAccount.clickTopLogo();
    await homePage.clikKeepMeUpdatedModalCloseButton();
    await homePage.clickFirstRaquet();
    await productPage.selectColorFromPicker('white');
    await productPage.setItemQuantity(3);
    await productPage.selectSizeFromPicker('s');
    await productPage.clickAddToCartButton();
    await productPage.cartModal.clickCheckOutButton();
    await checkoutPage.fillBillingDetailsForm(
      'tommy',
      'mcphillips',
      'Mexico',
      'Rancagua',
      'Caupolican 381',
      '+569999999',
      't.mcphillips@outlook.com',
      'que llegue rapido porfa'
    );
    await checkoutPage.applyDicountCode('abc123');
    await checkoutPage.fillCreditCardInformation('4242424242424242', '20/20', '123');
    await checkoutPage.clickPlaceOrder();

    const messageOfOrderPlaced = await checkoutPage.getPlacedOrderMessage();
    expect(messageOfOrderPlaced).toContain('Order saved successfully! Your order ID is');

    const orderId = await checkoutPage.getOrderId();
    console.log('Order ID:', orderId);

    const order = await orderApi.getOrderById(orderId);
    console.log('Order:', order);

    expect(order.items[0].title).toBe('Franklin Signature Pickleball Paddle');
    expect(order.items[0].price).toBe(100);
    expect(order.items[0].quantity).toBe(4);
  });

  test('doing a checkout e2e unsuccessfully', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    const myAccount = new MyAccount(page);
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);

    await homePage.goto();
    await homePage.clikKeepMeUpdatedModalCloseButton();
    await homePage.clickProfileIcon();
    await loginPage.clickNewCustomerButton();
    await registerPage.fillFormRegister('tommmy', 'mcphillips', testEmail2, '123456');
    await loginPage.login(testEmail2, '123456'); // Usa testEmail (no testEmail2) aquí, ¿intencional?
    await myAccount.clickTopLogo();
    await homePage.clikKeepMeUpdatedModalCloseButton();
    await homePage.clickFirstRaquet();
    await productPage.selectColorFromPicker('white');
    await productPage.setItemQuantity(3);
    await productPage.selectSizeFromPicker('s');
    await productPage.clickAddToCartButton();
    await productPage.cartModal.clickCheckOutButton();
    await checkoutPage.fillBillingDetailsForm(
      'tommy',
      'mcphillips',
      'Mexico',
      'Rancagua',
      'Caupolican 381',
      '+569999999',
      't.mcphillips@outlook.com',
      'que llegue rapido porfa'
    );
    await checkoutPage.applyDicountCode('abc123');
    await checkoutPage.fillCreditCardInformation('4242424242424241', '20/20', '123');
    await checkoutPage.clickPlaceOrder();

    const messageOfOrderPlaced = await checkoutPage.getPlacedOrderMessage();
    expect(messageOfOrderPlaced).toContain('Card not valid for this jurisdiction');
  });
});