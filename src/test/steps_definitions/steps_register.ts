import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { RegisterPage } from "../../pages/register.page";
import { fixture } from "../../fixture/fixture";
import * as data from '../../helper/util/test-data/registerUser.json';

setDefaultTimeout(60 * 1000 * 2);

Given('I navigate to the register page', async function () {
    const registerPage = new RegisterPage(fixture.page)
    await registerPage.navigateToTheRegistrationPage();
});

When('I create a new user', async function () {
    const registerPage = new RegisterPage(fixture.page)
    const username = data.username + Date.now().toString();
    await registerPage.registerUser(data.firstName, data.lastName, username, data.password, data.conformPassword, data.isMale);
});

Then('I confirm user registration is success', async function () {
    const registerPage = new RegisterPage(fixture.page)
    await registerPage.verifyLogin();
});