import Card

from "../../../components/ui/Card";

import {

useTaxRates

}

from "../hooks/useTaxRates";

export default function TaxStatistics(){

const{

rates,

}=

useTaxRates();

return(

<Card>

<div className="space-y-2">

<p>

Tax Rates:

{rates.length}

</p>

<p>

Active:

{

rates.filter(

rate=>

rate.status==="Active",

).length

}

</p>

</div>

</Card>

);

}