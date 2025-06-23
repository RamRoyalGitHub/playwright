import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/demo-qa/rs/login.page";
import { credentials } from "../resources/credentials";
import { DashboardPage } from "../pages/demo-qa/rs/dashboard.page";
import { CartPage } from "../pages/demo-qa/rs/cart.page";
import { CheckoutPage } from "../pages/demo-qa/rs/checkout.page";
import { CreditCardModel } from "../models/credit-card.model";
import { OrderConfirmPage } from "../pages/demo-qa/rs/order-confirm.page";
import { fetchPassword } from "../uitls/excelutil";

const userName = "ramec474@gmail.com";
const filePath = 'C://CodeBase//PW//resources//credentials.xlsx';
let password = '';

test.beforeEach(async() => {
    password = await fetchPassword(filePath,"Sheet1", userName);
    console.log(password);
});


test("Validate that user able to place the order for iPhone", async({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const orderConfirmPage = new OrderConfirmPage(page);

    await test.step("Login to the application", async() => {
        await page.goto('https://rahulshettyacademy.com/client/');
        await loginPage.login(credentials.userName, password);
        await expect(dashboardPage.base).toBeVisible();
    });

    await test.step("Add the iPhone to the cart", async() => {
        await dashboardPage.getProduct('IPHONE 13 PRO').addToCartButton.click();
        await expect(dashboardPage.cartProductsCount).toHaveText('1');
        await dashboardPage.navigateToCartPage();
        await expect(cartPage.base).toBeVisible();
    });

    await test.step("Validate iPhone in cart and do checkout", async() => {
        await expect(cartPage.getProduct('IPHONE 13 PRO').productName).toHaveText("IPHONE 13 PRO");
        await cartPage.checkoutButton.click();
        await expect(checkoutPage.emailInput).toBeVisible();
    });

    await test.step("Fill the card and shipping details and place the order", async() => {
        await checkoutPage.fillCreditCardDetails(new CreditCardModel({
            cardNumber: '7777888899990000',
            cvv: '987',
            name: 'venkat',
            expirayMonth: '12'
        }));
        await checkoutPage.selectCountry("India");
        await expect(checkoutPage.emaillabel).toHaveText(credentials.userName);
        await expect(checkoutPage.emailInput).toHaveValue(credentials.userName);
        await checkoutPage.placeOrderButton.click();
        await expect(orderConfirmPage.base).toBeVisible();
    });

    await test.step("Validate order confirmation and extract the orderId", async() => {
        const orderId = await orderConfirmPage.orderId.textContent();
        console.log('Order Confirmation Number:', orderId);
        await expect(orderConfirmPage.orderConfirmMessage).toHaveText("Thankyou for the order.");
    });
});