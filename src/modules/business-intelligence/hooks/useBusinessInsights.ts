import {

useExecutiveDashboard,

}

from "./useExecutiveDashboard";

import {

generateBusinessInsights,

}

from "../services/BusinessInsightEngine";

export function useBusinessInsights(){

const dashboard=

useExecutiveDashboard();

const insights=

generateBusinessInsights(

dashboard.totalRevenue,

dashboard.totalRevenue*0.65,

dashboard.inventoryValue,

dashboard.customerCount,

);

return{

insights,

};

}