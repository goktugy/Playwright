import {test, expect} from '@playwright/test';


test.beforeEach (async ({page, browser}) => {

    await page.goto("/", {waitUntil: "domcontentloaded"});

    await expect.soft(page).toHaveURL("https://www.livescore.com/en/");
})

test.describe.parallel("Testing Livescore Page", async () => {
    
    test('Go To Spain', async({page, browserName, browser}, testInfo) => {

        test.skip( browserName === "firefox")

        await test.step("Click Spain From Main Page", async () => {
            const SpainSelection =  await page.getByText('Spain').first()

            const testName = await testInfo.title
       
            await browser.startTracing(page, {path:`${testName}_trace.json`})

            await SpainSelection.click()

            await browser.stopTracing()

         })
            
         await test.step("Check That La Liga Selection In Spain Is Available Without Clicking", async () => {
          
                    
            const LaLiga = await page.getByRole('link', { name: 'LaLiga LaLiga' });
  
            await expect(LaLiga).toBeVisible()
            await expect(LaLiga).toContainText('LaLiga');


        })
          

    })

    test('Go To La Liga Selection In Spain', {tag: ['@smoke' , '@Release']}, async({page}) => {

        const SpainSelection =  await page.getByText('Spain').first()

        await SpainSelection.click()

        const LaLiga = await page.getByRole('link', { name: 'LaLiga LaLiga' });
        await LaLiga.click();
        await expect(page).toHaveTitle("Spain LaLiga Live Scores | Football");

    })      

    test('ARIA Snapchat', {tag: ['@smoke' , '@Release']}, async({page, browserName}) => {

        test.skip( browserName === "firefox")

        await test.step("Performing Aria Snapshot Verification", async () => {
            await expect(page.locator('#content')).toMatchAriaSnapshot(`
          - link "Football"
          - link "Hockey"
          - link "Basketball"
          - link "Tennis"
          - link "Cricket"
          `);    
         
        })
 
    })
 
})   

test.afterEach( async ({page, browserName}, testInfo) => {
    
    const testName = await testInfo.title
    await page.screenshot({path:`${testName}_${browserName}.png`})

})

