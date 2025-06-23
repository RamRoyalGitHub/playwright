import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/demo-qa/rs/login.page";
import { credentials } from "../resources/credentials";
import { DashboardPage } from "../pages/demo-qa/rs/dashboard.page";
import { CartPage } from "../pages/demo-qa/rs/cart.page";
import { CheckoutPage } from "../pages/demo-qa/rs/checkout.page";
import { CreditCardModel } from "../models/credit-card.model";
import { OrderConfirmPage } from "../pages/demo-qa/rs/order-confirm.page";
import testData from '../resources/credentials.json';



test("Validate that user able to place the order", async({page}) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const orderConfirmPage = new OrderConfirmPage(page);

    await test.step("Login to the application", async() => {
        await page.goto('/client/');
        await loginPage.login(testData.userName, testData.passWord);
        await expect(dashboardPage.base).toBeVisible();
    });

    await test.step("Add the product to the cart", async() => {
        await dashboardPage.getProduct(testData.product).addToCartButton.click();
        await expect(dashboardPage.cartProductsCount).toHaveText('1');
        await dashboardPage.navigateToCartPage();
        await expect(cartPage.base).toBeVisible();
    });

    await test.step("Validate product details in cart and do checkout", async() => {
        await expect(cartPage.getProduct(testData.product).productName).toHaveText(testData.product);
        await cartPage.checkoutButton.click();
        await expect(checkoutPage.emailInput).toBeVisible();
    });

    await test.step("Fill the card and shipping details and place the order", async() => {
        await checkoutPage.fillCreditCardDetails(new CreditCardModel({}));
        await checkoutPage.selectCountry("India");
        await expect(checkoutPage.emaillabel).toHaveText(credentials.userName);
        await expect(checkoutPage.emailInput).toHaveValue(credentials.userName);
        await checkoutPage.placeOrderButton.click();
        await expect(orderConfirmPage.base).toBeVisible();
    });

    await test.step("Validate order confirmation and extract the orderId", async() => {
        const orderId = await orderConfirmPage.orderId.textContent();
        console.log(orderId);
        await expect(orderConfirmPage.orderConfirmMessage).toHaveText("Thankyou for the order.");
    });

});

