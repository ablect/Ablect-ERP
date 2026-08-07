import Card

from "../../../components/ui/Card";

import {

usePositionStatistics

}

from "../hooks/usePositionStatistics";

export default function PositionStatistics(){

const{

total,

active,

}=

usePositionStatistics();

return(

<Card>

<div className="space-y-2">

<p>

Positions:

{total}

</p>

<p>

Active:

{active}

</p>

</div>

</Card>

);

}