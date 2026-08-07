import {

useExpenseStore

}

from "../store/ExpenseStore";

export function useExpenses(){

return useExpenseStore();

}