import Metric from "../../../components/ui/Metric";
import Card from "../../../components/ui/Card";

export default function ProductOverviewCard(){

return(

<Card>

<h2 className="text-xl font-semibold mb-5">

Inventory Overview

</h2>

<div className="grid grid-cols-2 gap-5">

<Metric

label="Products"

value="1,254"

/>

<Metric

label="Categories"

value="18"

/>

<Metric

label="Brands"

value="42"

/>

<Metric

label="Warehouse"

value="1"

/>

</div>

</Card>

);

}