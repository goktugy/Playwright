import {test, expect} from '@playwright/test';

test.beforeEach (async ({page}) => {

    await page.goto("https://www.amazon.com", {waitUntil: "domcontentloaded"});

    await expect.soft(page).toHaveURL("https://www.amazon.com/");

})

test.describe.parallel("Network Intercept Capture With Cookies", async () => {
    
    test('Confirm the domain and the existence of session cookies', async({page}) => {

        var sessionID_Found= false;
        var sessionID_Time_Found= false;
        var sessionToken_Found=false;
    
        const cookie = await page.context().cookies();

        for(let i = 0; i < cookie.length; i++) {
            expect(cookie[i].domain).toContain('amazon.com')

            if(cookie[i].name==="session-id"){
                sessionID_Found=true
            }
            else if(cookie[i].name ==="session-id-time"){
                sessionID_Time_Found= true;
            }
            else if(cookie[i].name ==="session-token"){
                sessionToken_Found=true;
            }
        }
        expect(sessionID_Found).toBeTruthy
        expect(sessionID_Time_Found).toBeTruthy
        expect(sessionToken_Found).toBeTruthy
    })
    test('Confirm the main lanaguage is English US', async({page}) => {

        const cookie = await page.context().cookies();

         for(let i = 0; i < cookie.length; i++) {
            if(cookie[i].name==="lc-main"){
                expect(cookie[i].value).toEqual("en_US")
            }
         
        }   

    })    

})