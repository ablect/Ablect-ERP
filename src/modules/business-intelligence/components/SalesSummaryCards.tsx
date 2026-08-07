import Card

from "../../../components/ui/Card";

import {

useSalesSummary

}

from "../hooks/useSalesSummary";

export default function SalesSummaryCards(){

const{

totalSales,

totalOrders,

totalCustomers,

}=

useSalesSummary();

return(

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

<Card>

<p>Total Sales</p>

<h2>

₦{totalSales.toLocaleString()}

</h2>

</Card>

<Card>

<p>Orders</p>

<h2>

{totalOrders.toLocaleString()}

</h2>

</Card>

<Card>

<p>Customers</p>

<h2>

{totalCustomers.toLocaleString()}

</h2>

</Card>

</div>

);

}