import { Locator, Page } from "@playwright/test";

export class FileDownload {

    readonly page: Page;
    readonly downloadButton: Locator;
    readonly uploadButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.downloadButton = page.getByRole("buttn", {name: 'Download'});
        this.uploadButton = page.locator("#fileinput");
    }
}