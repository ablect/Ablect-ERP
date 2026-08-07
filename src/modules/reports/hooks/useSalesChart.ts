import {

createChartPoint

}

from "../utils/createChartPoint";

export function useSalesChart(){

return{

data:[

createChartPoint(

"Mon",

120000

),

createChartPoint(

"Tue",

95000

),

createChartPoint(

"Wed",

180000

),

createChartPoint(

"Thu",

155000

),

createChartPoint(

"Fri",

220000

),

createChartPoint(

"Sat",

260000

),

createChartPoint(

"Sun",

175000

),

],

};

}