import {

useBalanceSheetTotals

}

from "./useBalanceSheetTotals";

export function useBalanceSheetValidation(){

const{

assets,

liabilities,

equity,

}=

useBalanceSheetTotals();

return{

balanced:

assets===

liabilities+

equity,

difference:

Math.abs(

assets-

(

liabilities+

equity

)

),

};

}