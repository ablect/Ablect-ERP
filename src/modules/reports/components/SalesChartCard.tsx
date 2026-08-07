import Card
from "../../../components/ui/Card";

import SalesLineChart
from "./charts/SalesLineChart";

export default function SalesChartCard(){

return(

<Card>

<h2 className="text-lg font-semibold">

Sales Trend

</h2>

<SalesLineChart/>

</Card>

);

}