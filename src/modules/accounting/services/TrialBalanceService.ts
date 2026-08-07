import type {

TrialBalanceRow

}

from "../types/TrialBalanceRow";

let rows:TrialBalanceRow[]=[];

export const trialBalanceService={

async getAll(){

return rows;

},

async generate(

rowsData:TrialBalanceRow[],

){

rows=rowsData;

return rows;

},

};