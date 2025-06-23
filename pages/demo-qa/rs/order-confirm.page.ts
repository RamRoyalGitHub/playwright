import { Locator, Page } from "@playwright/test";

export class OrderConfirmPage {

    readonly page: Page;
    readonly base: Locator;
    readonly orderConfirmMessage: Locator;
    readonly orderId: Locator;


    constructor(page: Page) {
        this.page = page;
        this.base = page.locator("app-thanksorder.ng-star-inserted");
        this.orderConfirmMessage = this.base.locator('.hero-primary');
        this.orderId = this.base.locator('label.ng-star-inserted');

    }
}