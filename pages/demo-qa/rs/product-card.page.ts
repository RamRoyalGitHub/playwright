import { Locator } from "@playwright/test";

export class ProductCardPage {

    readonly productName : Locator;
    readonly addToCartButton: Locator;
    readonly viewButton: Locator;

    constructor(productCardLocator: Locator) {
        this.productName = productCardLocator.locator('h5>b');
        this.addToCartButton = productCardLocator.locator('button:has(.fa-shopping-cart)');
        this.viewButton = productCardLocator.locator('button:has(.fa-eye)');
    }

}