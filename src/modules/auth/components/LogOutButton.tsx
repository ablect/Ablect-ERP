import Button
from "../../../components/ui/Button";

import {

useAuth

}

from "../hooks/useAuth";

export default function LogoutButton(){

const{

logout,

}=

useAuth();

return(

<Button

onClick={logout}

>

Logout

</Button>

);

}