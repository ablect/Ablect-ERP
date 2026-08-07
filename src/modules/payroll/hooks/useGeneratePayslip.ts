import {

generatePayslip

}

from "../utils/generatePayslip";

import {

usePayrolls

}

from "./usePayrolls";

export function useGeneratePayslip(){

const{

payrolls,

}=

usePayrolls();

function create(

id:string,

){

const payroll=

payrolls.find(

payroll=>

payroll.id===id,

);

if(!payroll){

return null;

}

return generatePayslip(

payroll,

);

}

return{

create,

};

}