import {

buildComparison

}

from "../utils/buildComparison";

import {

useRevenueSummary

}

from "./useRevenueSummary";

export function useRevenueComparison(){

const{

revenue,

}=

useRevenueSummary();

const previousRevenue=0;

return buildComparison(

revenue,

previousRevenue,

);

}