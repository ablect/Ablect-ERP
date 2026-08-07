import {

useMemo,

useState,

}

from "react";

import {

useUsers

}

from "./useUsers";

export function useUserSearch(){

const{

users,

}=

useUsers();

const[

query,

setQuery,

]=

useState("");

const filtered=

useMemo(

()=>{

return users.filter(

user=>

user.name

.toLowerCase()

.includes(

query

.toLowerCase(),

),

);

},

[

users,

query,

],

);

return{

query,

setQuery,

filtered,

};

}