import Card

from "../../../components/ui/Card";

import {

useAccountStatistics

}

from "../hooks/useAccountStatistics";

export default function AccountStatistics(){

const{

total,

assets,

liabilities,

equity,

revenue,

expenses,

}=

useAccountStatistics();

return(

<Card>

<div className="space-y-2">

<p>Total Accounts: {total}</p>

<p>Assets: {assets}</p>

<p>Liabilities: {liabilities}</p>

<p>Equity: {equity}</p>

<p>Revenue: {revenue}</p>

<p>Expenses: {expenses}</p>

</div>

</Card>

);

}