import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { fixture } from '../../fixture/fixture';

setDefaultTimeout(60 * 1000 * 2);

Given('The user navigates to the application', async function () {
    fixture.logger.info("Navigate to URL: "+process.env.BASEURL);
    await fixture.page.goto(process.env.BASEURL);
});

Given('The user clicks on the Login link', async function () {
    await fixture.page.locator("//*[text()=' Login ']/parent::button").click();
});

When('The user enters the username as {string}', async function (username: string) {
    await fixture.page.locator("#mat-input-0").fill(username);
});

When('The user enters the password as {string}', async function (password: string) {
    await fixture.page.locator("#mat-input-1").fill(password);
});

When('The user clicks on Login button', async function () {
    await fixture.page.locator("[class='mdc-button mdc-button--raised mat-mdc-raised-button mat-primary mat-mdc-button-base']").click();
    await fixture.page.waitForTimeout(1000);
});

Then('Login should be success', async function () {
    const username = await fixture.page.locator("//a[contains(@class,'mat-mdc-menu-trigger mdc-button')]/span[2]/span").textContent();
    fixture.logger.info("Username::"+username);
    expect(username).toContain("ortoni");
});

Then('Login should fail', async function () {
    await expect(fixture.page.locator("//*[text()='Register']/parent::button")).toBeVisible();
});