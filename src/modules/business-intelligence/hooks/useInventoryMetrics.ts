import {

createMetric

}

from "../utils/createMetric";

import {

useInventorySummary

}

from "./useInventorySummary";

export function useInventoryMetrics(){

const inventory=

useInventorySummary();

return[

createMetric(

"inventory",

"Inventory",

inventory.stockValue,

"₦",

"inventory",

),

];
}