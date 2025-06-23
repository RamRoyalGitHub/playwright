import { Locator, Page } from "@playwright/test";
import { ProductCardPage } from "./product-card.page";

export class DashboardPage {

    readonly page: Page;
    readonly base: Locator;
    readonly productcards: Locator;
    readonly cartButton: Locator;
    readonly cartProductsCount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.base = page.locator('#products');
        this.productcards = this.base.locator('.card');
        this.cartButton = page.locator('button[routerlink$="cart"]');
        this.cartProductsCount = page.locator('button[routerlink$="cart"] label');
    }

    getProduct(productName: string) {
        return new ProductCardPage(this.productcards.filter({hasText: productName}).first());
    }

    async navigateToCartPage() {
        await this.cartButton.click();
    }

}