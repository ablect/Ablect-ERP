import {

useBankAccounts

}

from "../hooks/useBankAccounts";

export default function BankCount(){

const{

accounts,

}=

useBankAccounts();

return(

<p>

Total Accounts:

{" "}

{accounts.length}

</p>

);

}