import Card

from "../../../components/ui/Card";

import {

useBankAccounts

}

from "../hooks/useBankAccounts";

export default function BankStatistics(){

const{

accounts,

}=

useBankAccounts();

const total=

accounts.reduce(

(sum,account)=>

sum+

account.balance,

0,

);

return(

<Card>

<h2 className="text-lg font-semibold">

Bank Balance

</h2>

<p>

₦

{total.toLocaleString()}

</p>

</Card>

);

}