import * as XLSX from "xlsx";

import {

reportSheetName

}

from "./reportSheetName";

export function exportExcel(

filename:string,

data:unknown[],

){

const worksheet=

XLSX.utils

.json_to_sheet(

data,

);

const workbook=

XLSX.utils

.book_new();

XLSX.utils

.book_append_sheet(

workbook,

worksheet,

reportSheetName(),

);

XLSX.writeFile(

workbook,

filename,

);

}