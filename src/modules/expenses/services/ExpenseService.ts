import type {

Expense

}

from "../types/Expense";

import {

defaultExpenses

}

from "../utils/defaultExpenses";

let expenses=

defaultExpenses;

export const expenseService={

async getAll(){

return expenses;

},

async create(

expense:Expense,

){

expenses=[

...expenses,

expense,

];

return expenses;

},

};