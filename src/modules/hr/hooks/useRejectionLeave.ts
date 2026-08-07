import {

useLeaveStore

}

from "../store/LeaveStore";

export function useRejectLeave(){

function reject(

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

status:"Rejected",

}

:leave,

);

setLeaves(updated);

}

return{

reject,

};

}