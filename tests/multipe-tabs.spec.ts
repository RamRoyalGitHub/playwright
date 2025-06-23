import {test, expect } from "@playwright/test";



test("Valiadte multiple tabs functionality @ram", async({page, context}, testSt) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const promise = context.waitForEvent('page');
    await page.locator(".blinkingText").click();
    const newPage = await promise;
    expect(newPage.url()).toBe("https://rahulshettyacademy.com/documents-request");
    await page.locator("#username").fill("test");
});