import type {

LoginCredentials

}

from "../types/LoginCredentials";

import {

createUser

}

from "../utils/createUser";

export const authService={

async login(

credentials:LoginCredentials,

){

return createUser(

"Administrator",

credentials.email,

"admin",

);

},

};