import type {

Budget

}

from "../types/Budget";

import type {

BudgetLine

}

from "../types/BudgetLine";

let budgets:Budget[]=[];

let lines:BudgetLine[]=[];

export const budgetService={

async getBudgets(){

return budgets;

},

async getLines(){

return lines;

},

async saveBudgets(

items:Budget[],

){

budgets=items;

},

async saveLines(

items:BudgetLine[],

){

lines=items;

},

};