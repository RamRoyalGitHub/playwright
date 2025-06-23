import { Locator } from "@playwright/test";

export class CartProductPage {

    readonly productName : Locator;

    constructor(productName: Locator) {
        this.productName = productName.locator('.cartSection h3');
    }
}