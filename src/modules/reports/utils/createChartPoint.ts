import type { ChartPoint }
from "../types/ChartPoint";

export function createChartPoint(

label:string,

value:number,

):ChartPoint{

return{

label,

value,

};

}