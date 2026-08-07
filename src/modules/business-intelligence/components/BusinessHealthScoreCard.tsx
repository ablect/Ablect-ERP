import Card from "../../../components/ui/Card";

import {

useBusinessHealthScore

}

from "../hooks/useBusinessHealthScore";

export default function BusinessHealthScoreCard(){

const{

score,

}=

useBusinessHealthScore();

return(

<Card>

<h3 className="text-lg font-semibold">

Business Health Score

</h3>

<div className="mt-6">

<h1 className="text-5xl font-bold">

{score}%

</h1>

<p className="text-slate-500 mt-2">

Overall Company Health

</p>

</div>

</Card>

);

}