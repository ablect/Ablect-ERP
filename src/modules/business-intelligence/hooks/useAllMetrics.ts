import {

useFinanceMetrics

}

from "./useFinanceMetrics";

import {

useInventoryMetrics

}

from "./useInventoryMetrics";

export function useAllMetrics(){

return[

...useFinanceMetrics(),

...useInventoryMetrics(),

];
}