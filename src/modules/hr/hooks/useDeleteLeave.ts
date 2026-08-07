import {

leaveService

}

from "../services/LeaveService";

import {

useLeaveStore

}

from "../store/LeaveStore";

export function useDeleteLeave(){

async function remove(

id:string,

){

const leaves=

await leaveService.delete(

id,

);

useLeaveStore

.getState()

.setLeaves(

leaves,

);

}

return{

remove,

};

}