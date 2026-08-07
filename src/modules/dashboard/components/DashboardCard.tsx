import type { DashboardCard as Card } from "../types/dashboard";

type Props={

card:Card;

};

export default function DashboardCard({

card

}:Props){

return(

<div
style={{

background:"white",

borderRadius:18,

padding:25,

boxShadow:"0 8px 24px rgba(0,0,0,.05)"

}}

>

<h3>{card.title}</h3>

<h1>{card.value}</h1>

<p>

▲ {card.change}%

</p>

</div>

);

}