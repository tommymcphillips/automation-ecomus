import { Page, Locator, expect } from "@playwright/test"; 

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameTextfield: Locator;
    readonly lastNameTextfield: Locator;
    readonly countryRegionSelector: Locator;
    readonly townCityTextfield: Locator;
    readonly addressTextfield: Locator;
    readonly phoneNumberTextfield: Locator;
    readonly emailTextfield: Locator;
    readonly otherNotesTextfields: Locator;
    readonly dicountCodeTextfield: Locator;
    readonly discountCodeApplyButton: Locator;
    readonly creditCardNumberTextfield: Locator;
    readonly mothYearExpTextfield: Locator;
    readonly cvcTextFields: Locator;
    readonly aggreeTerms: Locator;
    readonly placeOrderButton: Locator;
    readonly messageOrderPlacedLabel: Locator;

    
    constructor(page:Page){
        this.page = page;
        this.firstNameTextfield = page.locator('#first-name');
        this.lastNameTextfield = page.locator('#last-name');
        this.countryRegionSelector = page.locator('#country');
        this.townCityTextfield = page.locator('#city');
        this.addressTextfield = page.locator('#address');
        this.phoneNumberTextfield = page.locator('#phone');
        this.emailTextfield = page.locator('#email');
        this.otherNotesTextfields = page.locator('#note');
        this.dicountCodeTextfield = page.locator('div.tf-page-cart-footer > div > form > div:nth-child(2) > input[type=text]');
        this.discountCodeApplyButton = page.locator('div.tf-page-cart-footer > div > form > div:nth-child(2) > a');
        this.creditCardNumberTextfield = page.locator('div.tf-page-cart-footer > div > form > div.coupon-box.mb_20 > input[type=text]');
        this.mothYearExpTextfield = page.locator('div.tf-page-cart-footer > div > form > div.box.grid-2 > div:nth-child(1) > input[type=text]');
        this.cvcTextFields = page.locator('div.tf-page-cart-footer > div > form > div.box.grid-2 > div:nth-child(2) > input[type=text]');
        this.aggreeTerms = page.locator('#check-agree');
        this.placeOrderButton = page.locator('div.tf-page-cart-footer > div > form > button');
        this.messageOrderPlacedLabel = page.locator('#order-message > p');
      }

      async fillFirstName(firstName: string) {
        await this.firstNameTextfield.fill(firstName);
      }

      async fillLastName(lastName: string) {
        await this.lastNameTextfield.fill(lastName);
      }

      async selectCountryFromSelector(country: string) {
        await this.countryRegionSelector.selectOption(country);
      }

      async fillTownCity(townCity: string) {
        await this.townCityTextfield.fill(townCity);
      }

      async fillAddress(address: string) {
        await this.addressTextfield.fill(address);
      }

      async fillPhoneNumber(phoneNumber: string) {
        await this.phoneNumberTextfield.fill(phoneNumber);
      }

      async fillEmail(email: string) {
        await this.emailTextfield.fill(email);
      }

      async fillOtherNotes(notes: string) {
        await this.otherNotesTextfields.fill(notes);
      }

      async fillCountryRegion(firstName: string) {
        await this.firstNameTextfield.fill(firstName);
      }

      async fillDiscountCoude(discountCode: string) {
        await this.dicountCodeTextfield.fill(discountCode);
      }

      async clickApplyDiscountCode() {
        await this.discountCodeApplyButton.click();
      }

      async fillCreditCardNumber(creditCardNumber: string) {
        await this.creditCardNumberTextfield.fill(creditCardNumber);
      }

      async fillMonthAndYearCC(monthAndYearCC: string) {
        await this.mothYearExpTextfield.fill(monthAndYearCC);
      }

      async fillCVCCC(cvcCC: string) {
        await this.cvcTextFields.fill(cvcCC);
      }

      async clickAgreeTerms() {
        await this.aggreeTerms.click();
      }

      async clickPlaceOrder() {
        await this.placeOrderButton.click();
        await expect(this.messageOrderPlacedLabel).toBeVisible();
      }
      
      async fillBillingDetailsForm(
        firstName: string, 
        lastName: string, 
        country: string, 
        town: string, 
        address: string, 
        phoneNumber: string,
        email: string,
        notes: string
      ) {
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.selectCountryFromSelector(country);
        await this.fillTownCity(town);
        await this.fillAddress(address);
        await this.fillPhoneNumber(phoneNumber);
        await this.fillEmail(email);
        await this.fillOtherNotes(notes);
      }

      async applyDicountCode(discountCode: string) {
        await this.fillDiscountCoude(discountCode);
        await this.clickApplyDiscountCode();
      }

      async fillCreditCardInformation(creditCardNumber: string, monthYearExp: string, CVC: string) {
        await this.fillCreditCardNumber(creditCardNumber);
        await this.fillMonthAndYearCC(monthYearExp);
        await this.fillCVCCC(CVC);
        await this.clickAgreeTerms();
      }

      async getPlacedOrderMessage() {
        return await this.messageOrderPlacedLabel.innerText();
      }

      async getOrderId(): Promise<string> {
        const msg = await this.getPlacedOrderMessage();
        // Dividimos por ":" y tomamos la última parte, luego eliminamos espacios
        const parts = msg.split(':');
        return parts[parts.length - 1].trim();
      }
}