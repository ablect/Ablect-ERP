import {

useBudgetLines

}

from "./useBudgetLines";

export function useBudgetStatistics(){

const{

lines,

}=

useBudgetLines();

const budget=

lines.reduce(

(sum,item)=>

sum+item.budgetAmount,

0,

);

const actual=

lines.reduce(

(sum,item)=>

sum+item.actualAmount,

0,

);

const variance=

budget-actual;

return{

budget,

actual,

variance,

};

}