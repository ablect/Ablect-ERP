import type {

AccountingPeriod

}

from "../types/AccountingPeriod";

let periods:AccountingPeriod[]=[];

export const accountingPeriodService={

async getAll(){

return periods;

},

async create(

period:AccountingPeriod,

){

periods=[

...periods,

period,

];

return periods;

},

};