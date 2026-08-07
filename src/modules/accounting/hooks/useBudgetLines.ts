import {

useBudgetStore

}

from "../store/BudgetStore";

export function useBudgetLines(){

const{

lines,

setLines,

}=

useBudgetStore();

return{

lines,

setLines,

};

}