import {

useLeaveStore

}

from "../store/LeaveStore";

export function useApproveLeave(){

function approve(

id:string,

){

const{

leaves,

setLeaves,

}=

useLeaveStore.getState();

const updated=

leaves.map(leave=>

leave.id===id

?{

...leave,

status:"Approved",

}

:leave,

);

setLeaves(updated);

}

return{

approve,

};

}