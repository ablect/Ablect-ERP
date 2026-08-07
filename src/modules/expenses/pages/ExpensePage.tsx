import PageContainer

from "../../../components/ui/PageContainer";

import ExpenseHeader

from "../components/ExpenseHeader";

import ExpenseStatistics

from "../components/ExpenseStatistics";

import CreateExpenseButton

from "../components/CreateExpenseButton";

import ExpenseForm

from "../components/ExpenseForm";

import ExpenseSearch

from "../components/ExpenseSearch";

import ExpenseTable

from "../components/ExpenseTable";

import ExpenseCount

from "../components/ExpenseCount";

import {

useLoadExpenses

}

from "../hooks/useLoadExpenses";

export default function ExpensePage(){

useLoadExpenses();

return(

<PageContainer>

<div className="space-y-8">

<ExpenseHeader

title="Expenses"

description="Manage business expenses."

/>

<ExpenseStatistics/>

<CreateExpenseButton/>

<ExpenseForm/>

<ExpenseSearch/>

<ExpenseTable/>

<ExpenseCount/>

</div>

</PageContainer>

);

}