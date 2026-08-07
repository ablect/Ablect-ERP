import {

leaveService

}

from "../services/LeaveService";

import {

useLeaveStore

}

from "../store/LeaveStore";

export function useDeleteLeaveRequest(){

async function remove(

id:string,

){

const requests=

await leaveService.delete(

id,

);

useLeaveStore

.getState()

.setRequests(

requests,

);

}

return{

remove,

};

}