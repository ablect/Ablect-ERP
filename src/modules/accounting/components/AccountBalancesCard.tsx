import Card

from "../../../components/ui/Card";

import {

useAccountBalances

}

from "../hooks/useAccountBalances";

export default function AccountBalancesCard(){

const balances=

useAccountBalances();

return(

<Card>

<h2 className="text-lg font-semibold">

Account Balances

</h2>

<div className="space-y-2">

{

Object.entries(

balances,

).map(

([account,balance])=>(

<p key={account}>

{account}:

₦

{balance.toLocaleString()}

</p>

)

)

}

</div>

</Card>

);

}