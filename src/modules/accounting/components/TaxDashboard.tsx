import TaxStatistics

from "./TaxStatistics";

import TaxRateTable

from "./TaxRateTable";

export default function TaxDashboard(){

return(

<div className="space-y-6">

<TaxStatistics/>

<TaxRateTable/>

</div>

);

}