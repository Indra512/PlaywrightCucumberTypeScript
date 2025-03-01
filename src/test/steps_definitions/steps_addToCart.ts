import { When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import {expect, Page} from '@playwright/test';
import { fixture } from '../../fixture/fixture';

setDefaultTimeout(60 * 1000 * 2);

When('The user search for a {string}', async function (bookName: string) {
    fixture.logger.info("Searching for a book "+bookName);
    await fixture.page.getByPlaceholder("Search books or authors").fill(bookName);
    await fixture.page.waitForTimeout(1000);
    await fixture.page.locator("//*[@role='option']").click();
});

When('The user adds the book to the cart', async function () {
    await fixture.page.locator("//*[contains(text(),'Add to Cart')]/parent::button").click();
});

Then('The cart badge should get updated', async function () {
    await fixture.page.waitForTimeout(1000);
    const count = await fixture.page.locator("#mat-badge-content-0").textContent();
    fixture.logger.info("Badge count::"+count);
    expect(Number(count)).toBeGreaterThan(0);
});