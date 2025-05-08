import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { MyAccount } from '../pages/my-account.page';
import { EnvConfig } from '../env.config';

test.describe('@functional' , () => { 
  test('login credenciales validas', async ({ page }) => {
    const loginPage = new LoginPage(page);
  
    await loginPage.goto();
    await loginPage.fillEmailTextFiled(EnvConfig.getValidUser());
    await loginPage.fillPasswordTextField(EnvConfig.getValidPass());
    await loginPage.clickLoginButton();
    await expect(page).toHaveTitle('My Account || Ecomus - Ultimate Nextjs Ecommerce Template');
  });

  test('login credenciales invalidas', async ({ page }) => {
    const loginPage = new LoginPage(page);
  
    await loginPage.goto();
    await loginPage.fillEmailTextFiled(EnvConfig.getInvalidUser());
    await loginPage.fillPasswordTextField(EnvConfig.getInvalidPass());
    await loginPage.clickLoginButton();
    await expect(page).toHaveTitle('Login || Ecomus - Ultimate Nextjs Ecommerce Template');
  });

});
