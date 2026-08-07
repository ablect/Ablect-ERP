import type {
SystemUser
}
from "../types/SystemUser";

import {
defaultUsers
}
from "../utils/defaultUsers";

let users:SystemUser[]=defaultUsers;

export const userService={

async getAll(){

return users;

},

async create(
user:SystemUser,
){

users=[
...users,
user,
];

return users;

},

async delete(
id:string,
){

users=
users.filter(
user=>
user.id!==id,
);

return users;

},

async update(
updated:SystemUser,
){

users=
users.map(
user=>

user.id===updated.id

?

updated

:

user

);

return users;

},

};