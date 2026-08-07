import type {

FiscalYear

}

from "../types/FiscalYear";

let years:FiscalYear[]=[];

export const fiscalYearService={

async getAll(){

return years;

},

async create(

year:FiscalYear,

){

years=[

...years,

year,

];

return years;

},

};