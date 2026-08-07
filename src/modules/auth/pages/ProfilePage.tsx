import PageContainer
from "../../../components/ui/PageContainer";

import UserCard
from "../components/UserCard";

import LogoutButton
from "../components/LogOutButton";

export default function ProfilePage(){

return(

<PageContainer>

<div className="space-y-6">

<UserCard/>

<LogoutButton/>

</div>

</PageContainer>

);

}