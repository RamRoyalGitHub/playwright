import { Locator, Page } from "@playwright/test";
import { log } from "console";

export class BasePage {

    _locatorRoot: Locator;
    page: Page;
    constructor(container, index =0) {
        const parentLocator = this.getComponentLocator();
        let locatorRoot = container;

        if(parentLocator) {
            locatorRoot = locatorRoot.locator(parentLocator);
        }

        if (index != 0) {
            locatorRoot = locatorRoot.locator(parentLocator).nth(index);
        }

        if(locatorRoot['waitFor'] !=null) {
            this._locatorRoot = locatorRoot;
            this.page = locatorRoot.page();
        } else {
            this._locatorRoot = locatorRoot.locator('html');
            this.page = locatorRoot;
        }

    }

    get locatorRoot() {
        return this._locatorRoot;
    }

getComponentLocator() {
    return '';
}
}