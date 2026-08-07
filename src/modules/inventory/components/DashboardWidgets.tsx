import Grid from "../../../components/ui/Grid";
import ProductOverviewCard from "./ProductOverviewCard";
import StockValueCard from "./StockValueCard";
import InventoryHealthCard from "./InventoryHealthCard";
import RecentActivity from "./RecentActivity";

export default function DashboardWidgets(){

return(

<Grid columns={2}>

<ProductOverviewCard/>

<StockValueCard/>

<InventoryHealthCard/>

<RecentActivity/>

</Grid>

);

}