import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { MyAccount } from '../pages/my-account.page';
import { EnvConfig } from '../env.config';


test('login credenciales validas', async ({ page }) => {
const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const registerPage = new RegisterPage(page);
  const myAccount = new MyAccount(page);

  await homePage.goto();
  await homePage.clikKeepMeUpdatedModalCloseButton();
  await homePage.clickProfileIcon();
  await loginPage.clickNewCustomerButton();
  await registerPage.fillFormRegister('tommmy', 'mcphillips', 'tontera@nada.com', '123456');
  await loginPage.login(EnvConfig.getUser(), EnvConfig.getPass());
  await myAccount.clickTopLogo();
});


