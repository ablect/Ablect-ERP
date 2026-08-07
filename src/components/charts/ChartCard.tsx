import Card

from "../ui/Card";

import type {

ReactNode

}

from "react";

type Props={

title:string;

children:ReactNode;

};

export default function ChartCard({

title,

children,

}:Props){

return(

<Card>

<div className="space-y-4">

<h2 className="text-lg font-semibold">

{title}

</h2>

{children}

</div>

</Card>

);

}