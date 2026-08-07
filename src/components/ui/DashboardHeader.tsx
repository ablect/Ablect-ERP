import HeaderBar from "./HeaderBar";
import NotificationBell from "./NotificationBell";
import UserProfile from "./UserProfile";
import PageHeaderModern from "./PageHeaderModern";

export default function DashboardHeader(){

return(

<HeaderBar>

<PageHeaderModern

title="Inventory"

subtitle="Manage products and stock."

/>

<div className="flex items-center gap-6">

<NotificationBell/>

<UserProfile/>

</div>

</HeaderBar>

);

}