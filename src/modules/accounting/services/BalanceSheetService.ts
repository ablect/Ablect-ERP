import type {

BalanceSheetRow

}

from "../types/BalanceSheetRow";

let rows:BalanceSheetRow[]=[];

export const balanceSheetService={

async getAll(){

return rows;

},

async generate(

data:BalanceSheetRow[],

){

rows=data;

return rows;

},

};