import {

useAuth

}

from "../hooks/useAuth";

export default function CurrentUserBadge(){

const{

user,

}=

useAuth();

if(!user){

return null;

}

return(

<div className="rounded-lg bg-green-100 px-3 py-2">

Logged in as

{" "}

{user.name}

</div>

);

}