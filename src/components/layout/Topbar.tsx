import { Bell, Search, UserCircle2 } from "lucide-react";

import "./Topbar.css";

export default function Topbar(){

return(

<header className="topbar">

<div>

<h2>Ablect Business Suite</h2>

</div>

<div className="topbar-actions">

<Search size={20}/>

<Bell size={20}/>

<UserCircle2 size={28}/>

</div>

</header>

);

}