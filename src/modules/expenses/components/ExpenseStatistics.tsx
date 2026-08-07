import Card

from "../../../components/ui/Card";

import {

useExpenses

}

from "../hooks/useExpenses";

export default function ExpenseStatistics(){

const{

expenses,

}=

useExpenses();

const total=

expenses.reduce(

(sum,expense)=>

sum+

expense.amount,

0,

);

return(

<Card>

<h2 className="text-lg font-semibold">

Expenses

</h2>

<p>

₦

{total.toLocaleString()}

</p>

</Card>

);

}