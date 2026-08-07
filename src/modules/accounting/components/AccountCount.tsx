import {

useAccounts

}

from "../hooks/useAccounts";

export default function AccountCount(){

const{

accounts,

}=

useAccounts();

return(

<p>

Total Accounts:

{" "}

{accounts.length}

</p>

);

}