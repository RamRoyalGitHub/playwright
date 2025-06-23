import { Locator, Page } from "@playwright/test";

export class CalenderPage {

    readonly page: Page;
    readonly dateInput: Locator;
    readonly yearLabel: Locator;
    readonly years: Locator;
    readonly months: Locator;
    readonly days: Locator;
    readonly yearsPrevButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dateInput = page.locator(".react-date-picker .react-date-picker__inputGroup");
        this.yearLabel = page.locator(".react-calendar__navigation__label__labelText");
        this.years = page.locator(".react-calendar__tile.react-calendar__decade-view__years__year");
        this.months = page.locator(".react-calendar__tile.react-calendar__year-view__months__month");
        this.days = page.locator(".react-calendar__month-view__days button");
        this.yearsPrevButton = page.locator(".react-calendar__navigation__prev-button");
    }

    async selectYear(date: Date) {
        while (true) {
            const yearText = await this.years.nth(0).textContent();
            if (yearText === null || isNaN(Number(yearText)) || Number(yearText) >= date.getFullYear()) {
                await this.yearsPrevButton.click();
            } else {
                await this.years.filter({ hasText: (date.getFullYear()).toString() }).click();
                break;
            }
        }
    }

    async getDayOfMonth(date: Date): Promise<Locator> {
        return this.days.filter({ hasNot: this.page.locator(".react-calendar__month-view__days__day--neighboringMonth") })
            .filter({ hasText: new RegExp(`^${date.getDate().toString()}$`, 'gm') });
    }

}