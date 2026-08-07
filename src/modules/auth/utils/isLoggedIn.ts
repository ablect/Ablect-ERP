import type {

User

}

from "../types/User";

export function isLoggedIn(

user:User|null,

){

return user!==null;

}