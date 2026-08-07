import Card

from "../../../components/ui/Card";

type Props={

value:number;

};

export default function ExecutiveRevenueCard({

value,

}:Props){

return(

<Card>

<p>Total Revenue</p>

<h2>

₦{value.toLocaleString()}

</h2>

</Card>

);

}