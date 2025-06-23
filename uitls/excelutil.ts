import ExcelJS, { Workbook, Worksheet } from 'exceljs';
import { read } from 'node:fs';
import { setMaxIdleHTTPParsers } from 'node:http';

export async function readExcel(filePath: string, sheetName: string): Promise<Worksheet> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    return await workbook.getWorksheet(sheetName)!;
}

export async function findValue(sheet: Worksheet, value: string): Promise<{ rowNum?: number, cellNum?: number }> {
    let valueCoordinates = {};
    sheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, cellNumber) => {
            if (cell.value === value) {
                valueCoordinates = {
                    rowNum: rowNumber,
                    cellNum: cellNumber
                }
            }
        });
    });
    return valueCoordinates;
}

export async function fetchPassword(filePath: string, sheetName: string, value: string): Promise<string> {
    const worksheet = await readExcel(filePath, sheetName);
    const { rowNum, cellNum } = await findValue(worksheet, value);
    return (worksheet.getCell(rowNum!, cellNum! + 1).value?.toString() ?? '');
}

export async function writeExcel(filePath: string, sheetName: string, value: string, changeValue: string) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = await workbook.getWorksheet(sheetName)
    const { rowNum, cellNum } = await findValue(worksheet!, value);
    worksheet!.getCell(rowNum!, cellNum!+2).value = changeValue;
    await workbook.xlsx.writeFile(filePath);
}

