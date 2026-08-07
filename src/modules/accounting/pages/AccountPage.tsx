import PageContainer

from "../../../components/ui/PageContainer";

import AccountHeader

from "../components/AccountHeader";

import AccountOverview

from "../components/AccountOverview";

import CreateAccountButton

from "../components/CreateAccountButton";

import AccountForm

from "../components/AccountForm";

import AccountSearch

from "../components/AccountSearch";

import AccountTable

from "../components/AccountTable";

import AccountCount

from "../components/AccountCount";

import {

useLoadAccounts

}

from "../hooks/useLoadAccounts";

export default function AccountPage(){

useLoadAccounts();

return(

<PageContainer>

<div className="space-y-8">

<AccountHeader/>

<AccountOverview/>

<CreateAccountButton/>

<AccountForm/>

<AccountSearch/>

<AccountTable/>

<AccountCount/>

</div>

</PageContainer>

);

}