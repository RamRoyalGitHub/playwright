import test from "@playwright/test";
import { FileDownload } from "../pages/file-download.page";
import { writeExcel } from "../uitls/excelutil";
import { addAbortListener } from "events";


test("File upload and download test @ram", async({page}) => {
    const fileDownload = new FileDownload(page);
    const filePath = "C:\\Users\\OFFICE\\Downloads\\download.xlsx";

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

    await test.step("download the file", async() => {
        const downloadFile = page.waitForEvent('download');
        await fileDownload.downloadButton.click();
        const download = await downloadFile;
        await download.saveAs(filePath)
    });

    await test.step("update Excel values and upload the sheet", async() => {
        await writeExcel(filePath, "Sheet1", "Mango", "800" );
        await fileDownload.uploadButton.click();
        await fileDownload.uploadButton.setInputFiles(filePath);
    });



});
