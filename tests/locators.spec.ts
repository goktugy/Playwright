import {test, expect} from '@playwright/test';


test.beforeEach (async ({page}) =>{
        
    await page.goto("/", {waitUntil: "networkidle"});

    await expect.soft(page).toHaveURL("https://www.livescore.com/en/");

})

test.describe.parallel("Testing Livescore Page", async () => {
    
    test('Go To Spain', async({page, browserName}) => {
    
        test.skip( browserName === "firefox")

        await test.step("Click Spain From Main Page", async () => {
            const SpainSelection =  await page.getByText('Spain').first()

            await SpainSelection.click()

         })
            
         await test.step("Check That La Liga Selection In Spain Is Available Without Clicking", async () => {
            const LaLiga = await page.getByRole('link', { name: 'LaLiga LaLiga' });
            await expect(LaLiga).toBeVisible()
            await expect(LaLiga).toContainText('LaLiga');
           })
          

        })

    test('Go To La Liga Selection In Spain', {tag: ['@smoke' , '@Release']}, async({page, browserName}) => {

        test.skip( browserName === "firefox")

        const SpainSelection =  await page.getByText('Spain').first()

        await SpainSelection.click()

        const LaLiga = await page.getByRole('link', { name: 'LaLiga LaLiga' });
        await LaLiga.click();
        await expect(page).toHaveTitle("Spain LaLiga Live Scores | Football");

    })
})       
 
test.afterEach( async ({page, browserName}, testInfo) => {
    
    const testName = await testInfo.title
    await page.screenshot({path:`${testName}_${browserName}.png`})

})

