import Card
from "../../../components/ui/Card";

import {

useAuth

}

from "../hooks/useAuth";

export default function UserCard(){

const{

user,

}=

useAuth();

if(!user){

return null;

}

return(

<Card>

<h2 className="text-lg font-semibold">

Current User

</h2>

<p>

{user.name}

</p>

<p>

{user.email}

</p>

<p>

Role: {user.role}

</p>

</Card>

);

}