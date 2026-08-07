import type {

ProfitAndLossRow

}

from "../types/ProfitAndLossRow";

let rows:ProfitAndLossRow[]=[];

export const profitAndLossService={

async getAll(){

return rows;

},

async generate(

data:ProfitAndLossRow[],

){

rows=data;

return rows;

},

};