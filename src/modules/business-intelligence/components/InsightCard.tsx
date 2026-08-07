import type {

Insight

}

from "../types/Insight";

type Props={

insight:Insight;

};

export default function InsightCard({

insight,

}:Props){

return(

<div className="rounded-lg border p-4">

<h4 className="font-semibold">

{insight.title}

</h4>

<p className="text-sm mt-2">

{insight.description}

</p>

</div>

);

}