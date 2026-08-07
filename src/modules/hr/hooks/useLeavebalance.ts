import {

useLeaves

}

from "./useLeaves";

export function useLeaveBalance(

employeeId:string,

){

const{

leaves,

}=

useLeaves();

const approved=

leaves.filter(

leave=>

leave.employeeId===employeeId&&

leave.status==="Approved",

).length;

const annualEntitlement=20;

return{

annualEntitlement,

used:approved,

remaining:

annualEntitlement-

approved,

};

}