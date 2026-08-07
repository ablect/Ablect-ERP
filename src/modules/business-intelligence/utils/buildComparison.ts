import {

calculatePercentageChange

}

from "./calculatePercentageChange";

import {

getTrend

}

from "./getTrend";

import type {

KPIComparison

}

from "../types/KPIComparison";

export function buildComparison(

current:number,

previous:number,

):KPIComparison{

return{

current,

previous,

change:

current-previous,

changePercent:

calculatePercentageChange(

current,

previous,

),

trend:

getTrend(

current,

previous,

),

};

}