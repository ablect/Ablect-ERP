import {

createMetric

}

from "../utils/createMetric";

import {

useRevenueSummary

}

from "./useRevenueSummary";

export function useFinanceMetrics(){

const revenue=

useRevenueSummary();

return[

createMetric(

"revenue",

"Revenue",

revenue.revenue,

"₦",

"finance",

),

createMetric(

"profit",

"Profit",

revenue.profit,

"₦",

"finance",

),

];

}