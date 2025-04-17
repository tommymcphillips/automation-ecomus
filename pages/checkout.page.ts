import { Page, Locator, expect } from "@playwright/test"; 

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameTextfield: Locator;
    readonly countryRegionTextfield: Locator;
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

    
    constructor(page:Page){
        this.page = page;
        this.firstNameTextfield = page.locator('#first-name');
        this.countryRegionTextfield = page.locator('#last-name');
        this.townCityTextfield = page.locator('#country');
        this.addressTextfield = page.locator('#address');
        this.phoneNumberTextfield = page.locator('#phone');
        this.emailTextfield = page.locator('#email');
        this.otherNotesTextfields = page.locator('#note');
        this.dicountCodeTextfield = page.locator('#div.tf-page-cart-footer > div > form > div:nth-child(2) > input[type=text]');
        this.discountCodeApplyButton = page.locator('div.tf-page-cart-footer > div > form > div:nth-child(2) > a');
        this.creditCardNumberTextfield = page.locator('div.tf-page-cart-footer > div > form > div.coupon-box.mb_20 > input[type=text]');
        this.mothYearExpTextfield = page.locator('div.tf-page-cart-footer > div > form > div.box.grid-2 > div:nth-child(1) > input[type=text]');
        this.cvcTextFields = page.locator('div.tf-page-cart-footer > div > form > div.box.grid-2 > div:nth-child(2) > input[type=text]');
        this.aggreeTerms = page.locator('div.tf-page-cart-footer > div > form > button');
        this.placeOrderButton = page.locator('div.tf-page-cart-footer > div > form > button');
      }

      async fillFirstName(firstName: string) {
        this.firstNameTextfield.fill(firstName);
      }

      async fillCountryRegion(firstName: string) {
        this.firstNameTextfield.fill(firstName);
      }

      async fillBillingDetailsForm(firstName: string) {
        this.fillFirstName(firstName)
        // otros metodo atomicos de billing details
      }


      // Todo los fill, selectors, clickeabl atomicos
      // 3 metodos en encapsulen eso metodos atomicos 
      /// 1 metodo que reciba todo lo de billing y llame a los metodos atomicos
      // 1 metodo que reciba un discount code y lo aplique
      // 1 metodo que llene la TC
      // precionar button place order


}