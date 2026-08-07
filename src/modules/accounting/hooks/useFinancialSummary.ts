import {

useSalesStore

}

from "../../sales/store/SalesStore";

import {

useExpenseStore

}

from "../../expenses/store/ExpenseStore";

export function useFinancialSummary(){

const{

sales,

}=

useSalesStore();

const{

expenses,

}=

useExpenseStore();

const revenue=

sales.reduce(

(sum,sale)=>

sum+

sale.total,

0,

);

const expense=

expenses.reduce(

(sum,item)=>

sum+

item.amount,

0,

);

const grossProfit=

revenue-

expense;

const netProfit=

grossProfit;

return{

totalRevenue:

revenue,

totalExpenses:

expense,

grossProfit,

netProfit,

totalAssets:

0,

totalLiabilities:

0,

equity:

netProfit,

};

}