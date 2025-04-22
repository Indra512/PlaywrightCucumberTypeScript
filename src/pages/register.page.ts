import { expect, Page } from "@playwright/test";

export class RegisterPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private Elements = {
        firstName: "input[formcontrolname='firstName']",
        lastName: "input[formcontrolname='lastName']",
        username: "input[formcontrolname='userName']",
        password: "input[formcontrolname='password']",
        confirmPassword: "input[formcontrolname='confirmPassword']",
        maleRadioButton: "input[value='Male']",
        femalRadioButton: "input[value='Female']",
        btnRegister: "//*[text()='Register']/parent::button"
    };

    async navigateToTheRegistrationPage() {
        await this.page.goto('https://bookcart.azurewebsites.net/register', {waitUntil: "domcontentloaded"});
    }

    async registerUser(firstName: string, lastName: string, username: string, password: string, confirmPassword: string, isMale: boolean) {
        await this.page.locator(this.Elements.firstName).fill(firstName);
        await this.page.locator(this.Elements.lastName).fill(lastName);
        await this.page.locator(this.Elements.username).fill(username);
        await this.page.locator(this.Elements.password).fill(password);
        await this.page.locator(this.Elements.confirmPassword).fill(confirmPassword);
        if (isMale) {
            await this.page.locator(this.Elements.maleRadioButton).check();
        } else {
            await this.page.locator(this.Elements.femalRadioButton).check();
        }
        await this.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.btnRegister).click();
        await this.page.waitForTimeout(1000);
    }

    async verifyLogin() {
        await expect(this.page).toHaveURL('https://bookcart.azurewebsites.net/login');
    }
}
