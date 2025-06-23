import test, { expect } from "@playwright/test";
import { CalenderPage } from "../pages/calender.page";
import { dateFormat, formatDate } from "../uitls/date.utils";


test("Validate how to handle calender", async({page}) => {

    const date = new Date("03/06/1994");
    const calenderPage = new CalenderPage(page);
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await calenderPage.dateInput.click();
    await calenderPage.yearLabel.click();
    await calenderPage.yearLabel.click();

    await calenderPage.selectYear(date);
    await calenderPage.months.nth(date.getMonth()).click();
    await (await calenderPage.getDayOfMonth(date)).click();
    const filledDate = await calenderPage.dateInput.locator("input[name='date']").getAttribute('value');
    expect((await formatDate(date, dateFormat.DDMMYYYY)) === await formatDate(new Date(filledDate!), dateFormat.DDMMYYYY)).toBeTruthy(); 
}); 