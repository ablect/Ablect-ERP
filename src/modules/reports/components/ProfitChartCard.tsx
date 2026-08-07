import Card
from "../../../components/ui/Card";

import ProfitBarChart
from "./charts/ProfitBarChart";

export default function ProfitChartCard(){

return(

<Card>

<h2 className="text-lg font-semibold">

Profit Trend

</h2>

<ProfitBarChart/>

</Card>

);

}