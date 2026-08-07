import Card
from "../../../components/ui/Card";

type Props={

title:string;

};

export default function ChartPlaceholder({

title,

}:Props){

return(

<Card>

<h2 className="text-lg font-semibold">

{title}

</h2>

<div className="mt-4 h-72 rounded-lg border border-dashed flex items-center justify-center text-slate-400">

Interactive Chart

</div>

</Card>

);

}