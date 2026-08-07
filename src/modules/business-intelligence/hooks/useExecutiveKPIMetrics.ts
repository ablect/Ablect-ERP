import {

useExecutiveDashboard

}

from "./useExecutiveDashboard";

export function useExecutiveKPIMetrics(){

const dashboard=

useExecutiveDashboard();

return{

revenue:

dashboard.totalRevenue,

inventory:

dashboard.inventoryValue,

customers:

dashboard.customerCount,

suppliers:

dashboard.supplierCount,

cash:

dashboard.cashPosition,

};

}