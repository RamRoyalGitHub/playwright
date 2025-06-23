import test, { expect } from "@playwright/test";


test("Validate dialog ahndling", async({page}) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("#alertbtn").click();
    page.on('dialog', dialog => dialog.accept());
    expect(await page.screenshot()).toMatchSnapshot('visualTesting.png');

    
});