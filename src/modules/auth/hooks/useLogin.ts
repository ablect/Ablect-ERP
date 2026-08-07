import {

authService

}

from "../services/AuthService";

import {

useAuth

}

from "./useAuth";

import type {

LoginCredentials

}

from "../types/LoginCredentials";

export function useLogin(){

const{

login,

}=

useAuth();

async function signIn(

credentials:LoginCredentials,

){

const user=

await authService.login(

credentials,

);

login(user);

}

return{

signIn,

};

}