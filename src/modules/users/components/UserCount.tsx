import {

useUsers

}

from "../hooks/useUsers";

export default function UserCount(){

const{

users,

}=

useUsers();

return(

<p>

Total Users:

{" "}

{users.length}

</p>

);

}