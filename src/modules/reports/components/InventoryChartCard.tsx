import Card
from "../../../components/ui/Card";

import InventoryPieChart
from "./charts/InventoryPieChart";

export default function InventoryChartCard(){

return(

<Card>

<h2 className="text-lg font-semibold">

Inventory Distribution

</h2>

<InventoryPieChart/>

</Card>

);

}