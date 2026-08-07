import {

usePayrolls

}

from "./usePayrolls";

export function usePayrollHistory(){

const{

payrolls,

}=

usePayrolls();

return{

history:

payrolls,

};

}