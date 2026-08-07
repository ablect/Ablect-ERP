import {

useEffect

}

from "react";

import {

generateInsights

}

from "../services/InsightGenerator";

import {

useAllMetrics

}

from "./useAllMetrics";

import {

useInsightsStore

}

from "../store/InsightsStore";

export function useGenerateInsights(){

const metrics=

useAllMetrics();

const{

setInsights,

}=

useInsightsStore();

useEffect(()=>{

setInsights(

generateInsights(metrics),

);

},[

metrics,

setInsights,

]);

}