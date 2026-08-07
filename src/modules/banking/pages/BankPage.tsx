import PageContainer
from "../../../components/ui/PageContainer";

import BankHeader
from "../components/BankHeader";

import BankStatistics
from "../components/BankStatistics";

import CreateBankAccountButton
from "../components/CreateBankAccountButton";

import BankAccountForm
from "../components/BankAccountForm";

import BankSearch
from "../components/BankSearch";

import BankAccountTable
from "../components/BankAccountTable";

import BankCount
from "../components/BankCount";

import {
useLoadBankAccounts
}
from "../hooks/useLoadBankAccounts";

export default function BankPage(){

useLoadBankAccounts();

return(

<PageContainer>

<div className="space-y-8">

<BankHeader/>

<BankStatistics/>

<CreateBankAccountButton/>

<BankAccountForm/>

<BankSearch/>

<BankAccountTable/>

<BankCount/>

</div>

</PageContainer>

);

}