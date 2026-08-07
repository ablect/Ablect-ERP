import Card

from "../../../components/ui/Card";

import {

useCurrencies

}

from "../hooks/useCurrencies";

export default function CurrencyStatistics(){

const{

currencies,

}=

useCurrencies();

return(

<Card>

<div className="space-y-2">

<p>

Currencies:

{currencies.length}

</p>

<p>

Base Currency:

{

currencies.find(

item=>

item.isBaseCurrency,

)?.code??

"Not Set"

}

</p>

</div>

</Card>

);

}