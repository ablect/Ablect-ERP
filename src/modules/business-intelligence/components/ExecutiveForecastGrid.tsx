import RevenueForecastCard from "./RevenueForecastCard";
import ExpenseForecastCard from "./ExpenseForecastCard";
import ProfitForecastCard from "./ProfitForecastCard";
import InventoryForecastCard from "./InventoryForecastCard";

export default function ExecutiveForecastGrid(){

return(

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

<RevenueForecastCard/>

<ExpenseForecastCard/>

<ProfitForecastCard/>

<InventoryForecastCard/>

</div>

);

}