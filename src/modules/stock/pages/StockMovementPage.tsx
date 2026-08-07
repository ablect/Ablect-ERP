import PageContainer
from "../../../components/ui/PageContainer";

import RecentStockMovementCard

from "../components/RecentStockMovementCard";
import StockStatistics

from "../components/StockStatistics";
import SectionTitle

from "../../../components/ui/SectionTitle";

import StockMovementTable

from "../components/StockMovementTable";
import StockDashboardCards
from "../components/StockDashboardCards";
import StockAdjustmentCard
from "../components/StockAdjustmentCard";
import StockAdjustmentHistory
from "../components/StockAdjustmentHistory";
import WarehouseCard
from "../components/WarehouseCard";

import StockTransferCard
from "../components/StockTransferCard";
import WarehouseList
from "../components/WarehouseList";

import StockTransferHistory
from "../components/StockTransferHistory";
export default function StockMovementPage(){

return(

<PageContainer>

<div className="space-y-8">

<SectionTitle



title="Stock Movements"

subtitle="Inventory movement history."

/>
<StockDashboardCards />
<StockAdjustmentCard />
<StockAdjustmentHistory />
<WarehouseCard />

<StockTransferCard />
<WarehouseList/>

<StockTransferHistory/>
<RecentStockMovementCard/>
<StockStatistics/>
<StockMovementTable/>

</div>

</PageContainer>

);

}