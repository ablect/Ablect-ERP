import {

useLeaves

}

from "./useLeaves";

export function useLeaveReport(){

const{

leaves,

}=

useLeaves();

const annual=

leaves.filter(

leave=>

leave.leaveType==="Annual",

).length;

const sick=

leaves.filter(

leave=>

leave.leaveType==="Sick",

).length;

const maternity=

leaves.filter(

leave=>

leave.leaveType==="Maternity",

).length;

return{

annual,

sick,

maternity,

total:

leaves.length,

};

}