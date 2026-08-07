import DashboardCard from "./DashboardCard";

import { dashboardCards } from "../services/dashboardService";

export default function CardGrid(){

return(

<div

style={{

display:"grid",

gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",

gap:20

}}

>

{

dashboardCards.map(card=>(

<DashboardCard

key={card.title}

card={card}

/>

))

}

</div>

);

}