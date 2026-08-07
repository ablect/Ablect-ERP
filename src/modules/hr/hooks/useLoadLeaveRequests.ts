import {

useEffect

}

from "react";

import {

leaveService

}

from "../services/LeaveService";

import {

useLeaveStore

}

from "../store/LeaveStore";

export function useLoadLeaveRequests(){

const{

setRequests,

}=

useLeaveStore();

useEffect(()=>{

async function load(){

const requests=

await leaveService.getAll();

setRequests(

requests,

);

}

load();

},[

setRequests,

]);

}