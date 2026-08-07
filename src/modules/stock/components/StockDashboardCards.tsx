import LowStockAlert
from "./LowStockAlert";

import OutOfStockAlert
from "./OutOfStockAlert";

import StockValueCard
from "./StockValueCard";
import StockAdjustmentSummary
from "./StockAdjustmentSummary";
export default function StockDashboardCards() {

  return (

<div className="grid gap-4 md:grid-cols-4">

<StockValueCard/>

<LowStockAlert/>

<OutOfStockAlert/>

<StockAdjustmentSummary/>

</div>

);
}