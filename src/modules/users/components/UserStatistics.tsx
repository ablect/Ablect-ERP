import Card

from "../../../components/ui/Card";

import {

useUsers

}

from "../hooks/useUsers";

export default function UserStatistics(){

const{

users,

}=

useUsers();

return(

<Card>

<h2 className="text-lg font-semibold">

Users

</h2>

<p>

{users.length}

</p>

</Card>

);

}