import {

createChartPoint

}

from "../utils/createChartPoint";

export function usePurchaseChart(){

return{

data:[

createChartPoint("Mon",80000),

createChartPoint("Tue",90000),

createChartPoint("Wed",120000),

createChartPoint("Thu",70000),

createChartPoint("Fri",100000),

createChartPoint("Sat",95000),

createChartPoint("Sun",85000),

],

};

}