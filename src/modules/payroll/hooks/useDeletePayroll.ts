import {

payrollService

}

from "../services/PayrollService";

import {

usePayrollStore

}

from "../store/PayrollStore";

export function useDeletePayroll(){

async function remove(

id:string,

){

const payrolls=

await payrollService.delete(

id,

);

usePayrollStore

.getState()

.setPayrolls(

payrolls,

);

}

return{

remove,

};

}