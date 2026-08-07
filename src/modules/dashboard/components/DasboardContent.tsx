import CardGrid from "./CardGrid";
import RevenueCard from "./RevenueCard";
import SalesChart from "./SalesChart";

export default function DashboardContent(){

return(

<div className="space-y-8">

<RevenueCard/>

<CardGrid/>

<SalesChart/>

</div>

);

}