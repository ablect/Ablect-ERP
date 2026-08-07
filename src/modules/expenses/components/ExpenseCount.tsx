import {

useExpenses

}

from "../hooks/useExpenses";

export default function ExpenseCount(){

const{

expenses,

}=

useExpenses();

return(

<p>

Total Expenses:

{" "}

{expenses.length}

</p>

);

}