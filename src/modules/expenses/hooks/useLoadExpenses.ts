import {

useEffect

}

from "react";

import {

expenseService

}

from "../services/ExpenseService";

import {

useExpenseStore

}

from "../store/ExpenseStore";

export function useLoadExpenses(){

const{

setExpenses,

}=

useExpenseStore();

useEffect(()=>{

async function load(){

const expenses=

await expenseService.getAll();

setExpenses(

expenses,

);

}

load();

},[

setExpenses,

]);

}