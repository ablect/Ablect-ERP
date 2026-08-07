import {

createExpense

}

from "../utils/createExpense";

import {

expenseService

}

from "../services/ExpenseService";

import {

useExpenseStore

}

from "../store/ExpenseStore";

export function useCreateExpense(){

async function create(

title:string,

category:string,

amount:number,

vendor:string,

notes:string,

){

const expense=

createExpense(

title,

category,

amount,

vendor,

notes,

);

const expenses=

await expenseService.create(

expense,

);

useExpenseStore

.getState()

.setExpenses(

expenses,

);

}

return{

create,

};

}