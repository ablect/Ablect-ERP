import PageContainer

from "../../../components/ui/PageContainer";
import UserRoleFilter

from "../components/UserRoleFilter";
import UserHeader

from "../components/UserHeader";

import UserStatistics

from "../components/UserStatistics";

import CreateUserButton

from "../components/CreateUserButton";

import UserForm

from "../components/UserForm";

import UserSearch

from "../components/UserSearch";

import UserTable

from "../components/UserTable";

import UserCount

from "../components/UserCount";

import {

useLoadUsers

}

from "../hooks/useLoadUsers";

export default function UserPage(){

useLoadUsers();

return(

<PageContainer>

<div className="space-y-8">

<UserHeader

title="Users"

description="Manage system users."

/>

<UserStatistics/>

<CreateUserButton/>

<UserForm/>

<UserSearch/>
<UserRoleFilter/>
<UserTable/>

<UserCount/>

</div>

</PageContainer>

);

}