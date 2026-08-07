import Card from "../../../components/ui/Card";

type Props={

title:string;

value:string;

change:number;

};

export default function KPITrendCard({

title,

value,

change,

}:Props){

return(

<Card>

<h3>

{title}

</h3>

<h2 className="text-3xl font-bold mt-4">

{value}

</h2>

<p

className={

change>=0

?

"text-green-600"

:

"text-red-600"

}

>

{change>=0?"+":""}

{change.toFixed(1)}%

</p>

</Card>

);

}