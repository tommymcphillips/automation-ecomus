import { Page, Locator, expect } from '@playwright/test';
import { EnvConfig } from '../env.config';

export class HomePage {
  readonly page: Page;
  readonly profileIcon: Locator;
  readonly keepMeUpdatedModalCloseButton:Locator;
  readonly firstRaquet: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileIcon = page.locator("ul > li.nav-account > a");
    this.keepMeUpdatedModalCloseButton = page.locator("div.modal-top > span");
    this.firstRaquet = page.locator("div:nth-child(1) > div.card-product-wrapper > a")
  }

  async goto() {
    await this.page.goto(EnvConfig.getBaseUrl());
  }

  async clickProfileIcon() {
    await this.profileIcon.click();
  }

  async clikKeepMeUpdatedModalCloseButton(){
    await expect(this.keepMeUpdatedModalCloseButton).toBeVisible();
    await this.keepMeUpdatedModalCloseButton.click();
  }
  async clickFirstRaquet(){
    await this.firstRaquet.click();
  }
 }