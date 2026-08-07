import {

useTaxRates

}

from "../hooks/useTaxRates";

export default function TaxRateTable(){

const{

rates,

}=

useTaxRates();

return(

<div className="overflow-x-auto rounded-xl border">

<table className="min-w-full">

<thead>

<tr>

<th>Name</th>

<th>Code</th>

<th>Rate</th>

<th>Status</th>

</tr>

</thead>

<tbody>

{rates.map(rate=>(

<tr key={rate.id}>

<td>{rate.name}</td>

<td>{rate.code}</td>

<td>{rate.percentage}%</td>

<td>{rate.status}</td>

</tr>

))}

</tbody>

</table>

</div>

);

}