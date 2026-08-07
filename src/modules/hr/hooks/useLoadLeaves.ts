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

export function useLoadLeaves(){

const{

setLeaves,

}=

useLeaveStore();

useEffect(()=>{

async function load(){

const leaves=

await leaveService.getAll();

setLeaves(

leaves,

);

}

load();

},[

setLeaves,

]);

}