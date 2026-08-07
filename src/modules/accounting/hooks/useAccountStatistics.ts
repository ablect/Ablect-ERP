import {

useAccounts

}

from "./useAccounts";

export function useAccountStatistics(){

const{

accounts,

}=

useAccounts();

return{

total:

accounts.length,

assets:

accounts.filter(

a=>a.type==="Asset",

).length,

liabilities:

accounts.filter(

a=>a.type==="Liability",

).length,

equity:

accounts.filter(

a=>a.type==="Equity",

).length,

revenue:

accounts.filter(

a=>a.type==="Revenue",

).length,

expenses:

accounts.filter(

a=>a.type==="Expense",

).length,

};

}