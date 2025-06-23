import { Locator, Page } from "@playwright/test";
import { CreditCardModel } from "../../../models/credit-card.model";

export class CheckoutPage {
    readonly page: Page;
    readonly base: Locator;
    readonly creditCardNumberInput: Locator;
    readonly expiryMonthDropdown: Locator;
    readonly cvvInput: Locator;
    readonly nameInput: Locator;
    readonly emaillabel: Locator;
    readonly emailInput: Locator;
    readonly countryInput: Locator;
    readonly countrySearchResults: Locator;
    readonly couponInput: Locator;
    readonly placeOrderButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.base = page.locator("app-order.ng-star-inserted");
        this.creditCardNumberInput = this.base.locator('.field input.text-validated');
        this.expiryMonthDropdown  = this.base.locator('.field.small select').first();
        this.cvvInput = this.base.locator('.field.small:has(.numberCircle)').locator('input');
        this.nameInput = this.base.locator('.field:has-text("Name on Card ")').locator('input');
        this.emailInput = this.base.locator('.user__name input.ng-untouched');
        this.emaillabel = this.base.locator('.user__name label');
        this.countryInput = this.base.locator('.form-group input');
        this.countrySearchResults = this.base.locator('.form-group .list-group');
        this.countryInput = this.base.locator('input[placeholder="Select Country"]');
        this.placeOrderButton = this.base.locator('a.action__submit');

    }

    async selectCountry(countryName: string) {
        await this.countryInput.pressSequentially(countryName);
        await this.countrySearchResults.filter({hasText: new RegExp(`${countryName}$`,'igm')}).click();
    }

    async fillCreditCardDetails(creditCardModel: CreditCardModel) {
        await this.creditCardNumberInput.fill(creditCardModel.cardNumber);
        await this.cvvInput.fill(creditCardModel.cvv);
        await this.nameInput.fill(creditCardModel.name);
        await this.expiryMonthDropdown.selectOption(creditCardModel.expirayMonth);
    }
}