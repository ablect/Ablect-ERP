import Card
from "../../../components/ui/Card";

import PurchaseLineChart
from "./charts/PurchaseLineChart";

export default function PurchaseChartCard(){

return(

<Card>

<h2 className="text-lg font-semibold">

Purchase Trend

</h2>

<PurchaseLineChart/>

</Card>

);

}