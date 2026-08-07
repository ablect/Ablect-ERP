import {

useBudgetStore

}

from "../store/BudgetStore";

export function useBudgets(){

const{

budgets,

setBudgets,

}=

useBudgetStore();

return{

budgets,

setBudgets,

};

}