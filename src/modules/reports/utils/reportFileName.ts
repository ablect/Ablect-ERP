import type {

ExportFormat

}

from "../types/ExportFormat";

export function reportFileName(

format: ExportFormat,

){

const date=

new Date()

.toISOString()

.substring(0,10);

switch(format){

case "excel":

return `Report-${date}.xlsx`;

case "csv":

return `Report-${date}.csv`;

case "pdf":

return `Report-${date}.pdf`;

}

}