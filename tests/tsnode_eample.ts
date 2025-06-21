import {chromium} from '@playwright/test';

(async() => {

    const browser = await chromium.launch({

        headless:false,
        args: ["--start-fullscreen"],
    });

    const browserInstance = await browser.newContext({ viewport: null });

    const page = await browserInstance.newPage();
    await page.goto("https://thewarehouse.co.nz/", {waitUntil: "domcontentloaded"});

    await page.locator("data-test-id=category-root").hover();

    await page.locator('.mega-menu-root-list >> #category-homegarden').hover();

    await page.locator('a[role="menuitem"]:has-text("Lounge")').hover();

    await browser.close(); 

})();