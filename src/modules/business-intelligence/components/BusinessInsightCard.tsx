import Card from "../../../components/ui/Card";

import type {

BusinessInsight,

}

from "../types/BusinessInsight";

type Props={

insight:BusinessInsight;

};

export default function BusinessInsightCard({

insight,

}:Props){

return(

<Card>

<h3 className="font-semibold">

{insight.title}

</h3>

<p className="mt-2 text-sm">

{insight.description}

</p>

<p className="mt-4 text-blue-600 text-sm">

{insight.recommendation}

</p>

</Card>

);

}