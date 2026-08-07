import {

createChartPoint

}

from "../utils/createChartPoint";

export function useProfitChart(){

return{

data:[

createChartPoint("Jan",250000),

createChartPoint("Feb",340000),

createChartPoint("Mar",410000),

createChartPoint("Apr",390000),

createChartPoint("May",510000),

createChartPoint("Jun",620000),

],

};

}