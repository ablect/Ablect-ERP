import {

userService

}

from "../services/UserService";

import {

useUserStore

}

from "../store/UserStore";

import type {

SystemUser

}

from "../types/SystemUser";

export function useToggleUser(){

async function toggle(

user:SystemUser,

){

const users=

await userService.update({

...user,

active:

!user.active,

});

useUserStore

.getState()

.setUsers(

users,

);

}

return{

toggle,

};

}