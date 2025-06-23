import { Locator, Page } from "@playwright/test";
import { CartProductPage } from "./cart-product-card.page";

export class CartPage {

    readonly page: Page;
    readonly base: Locator;
    readonly products: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.base = page.locator('app-profile.ng-star-inserted');
        this.products = this.base.locator('.cart');
        this.checkoutButton = this.base.locator('.subtotal li>button');
    }

    getProduct(productName: string): CartProductPage {
        return new CartProductPage(this.products.filter({hasText: productName}).last()) ;
    }
}