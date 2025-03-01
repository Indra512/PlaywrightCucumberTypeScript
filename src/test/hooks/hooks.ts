import { BeforeAll, Before, After, AfterAll, Status } from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium } from '@playwright/test';
import { fixture } from '../../fixture/fixture';
import { invokeBrowser } from '../../helper/browsers/browser_manager';
import { getEnv } from '../../helper/env/env';
import { createLogger } from 'winston';
import { options } from '../../helper/util/logger';
const fse = require('fs-extra');

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser();
});

Before(async function ({ pickle }) {
    context = await browser.newContext({
        recordVideo: {
            dir: "test-results/videos",
        }
    });
    const page = await context.newPage();
    fixture.page = page;
    fixture.logger = createLogger(options(`${pickle.name}_${pickle.id}`));
    fixture.logger.info(`**********Scenario Started::${pickle.name}**********`);
});

After(async function ({ pickle, result }) {
    let videoPath: string;
    let image: Buffer;
    fixture.logger.info(`**********Scenario Ended::${pickle.name}**********`);
    if (result?.status === Status.FAILED) {
        image = await fixture.page.screenshot();
        this.attach(image, "image/png");
        fixture.logger.info(`${pickle.name} scenario is failed`);
    } else {
        fixture.logger.info(`${pickle.name} scenario is passed`);
    }
    await fixture.page.close();
    await context.close();
    if (result?.status === Status.FAILED) {
        videoPath = await fixture.page.video().path();
        this.attach(fse.readFileSync(videoPath), "video/webm");
    }
});

AfterAll(async function () {
    fixture.logger.close();
    await browser.close();
});