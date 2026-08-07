import {

createChartPoint

}

from "../utils/createChartPoint";

export function useInventoryChart(){

return{

data:[

createChartPoint("Products",540),

createChartPoint("Low",23),

createChartPoint("Out",6),

],

};

}