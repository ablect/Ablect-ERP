import type {

CashFlowRow

}

from "../types/CashFlowRow";

let rows:CashFlowRow[]=[];

export const cashFlowService={

async getAll(){

return rows;

},

async generate(

data:CashFlowRow[],

){

rows=data;

return rows;

},

};