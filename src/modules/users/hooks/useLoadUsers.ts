import { useEffect }

from "react";

import {

userService

}

from "../services/UserService";

import {

useUserStore

}

from "../store/UserStore";

export function useLoadUsers(){

const{

setUsers,

}=

useUserStore();

useEffect(()=>{

async function load(){

const users=

await userService.getAll();

setUsers(users);

}

load();

},[

setUsers,

]);

}