import {test, expect} from '@playwright/test';


test.beforeEach (async ({page, browser}) => {

    await page.goto("/", {waitUntil: "domcontentloaded"});

    await expect.soft(page).toHaveURL("https:/www.cnn.com");
})

test.describe.parallel("Testing CNN Page", async () => {
    
    test('Go To CNN', async({page, browserName, browser}, testInfo) => {

        test.skip( browserName === "firefox")

        await test.step("Click CNN Logo From Main Page", async () => {
  
            const testName = await testInfo.title
            
            const cnnSelection= await page.locator('#pageHeader').getByRole('link', { name: 'CNN logo' })
          
            await cnnSelection.click()
       
            await browser.startTracing(page, {path:`${testName}_trace.json`})

            await expect(page.getByRole('link', { name: 'US', exact: true })).toBeVisible()  
                
            await browser.stopTracing()

         })
            
         await test.step("Check That Worlds Section Is Visible Without Clicking", async () => {
          
                    
            const worldNews = await page.getByRole('link', { name: 'World' }).first()
  
            await expect(worldNews).toBeVisible()
            await expect(worldNews).toContainText('World');


        })

    })

    test('Go To Travel Selection In CNN', {tag: ['@smoke' , '@Release']}, async({page}) => {

        
        await page.locator('#pageHeader').getByRole('link', { name: 'Travel' }).click();
        await expect(page.getByRole('link', { name: 'Destinations', exact: true })).toBeVisible();

    })      

    test('ARIA Snapchat', {tag: ['@smoke' , '@Release']}, async({page, browserName}) => {

        test.skip( browserName === "firefox")
        await test.step("Performing Aria Snapshot Verification", async () => {
          await expect(page.locator('#pageHeader')).toMatchAriaSnapshot(`
          - button "Open Menu Icon":
            - img
          - link "CNN logo":
            - /url: https://edition.cnn.com
            - img
          - navigation:
            - link "US":
              - /url: https://edition.cnn.com/us
            - link "World":
              - /url: https://edition.cnn.com/world
            - link "Politics":
              - /url: https://edition.cnn.com/politics
            - link "Business":
              - /url: https://edition.cnn.com/business
            - link "Health":
              - /url: https://edition.cnn.com/health
            - link "Entertainment":
              - /url: https://edition.cnn.com/entertainment
            - link "Style":
              - /url: https://edition.cnn.com/style
            - link "Travel":
              - /url: https://edition.cnn.com/travel
            - text: More
          `);
        })
 
    })
 
})   

test.afterEach( async ({page, browserName}, testInfo) => {
    
    const testName = await testInfo.title
    await page.screenshot({path:`${testName}_${browserName}.png`})

})

