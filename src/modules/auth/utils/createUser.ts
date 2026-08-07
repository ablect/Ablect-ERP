import type {

User

}

from "../types/User";

import type {

UserRole

}

from "../types/UserRole";

export function createUser(

name:string,

email:string,

role:UserRole,

):User{

return{

id:crypto.randomUUID(),

name,

email,

role,

};

}