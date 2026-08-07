import {

useMetrics

}

from "./useMetrics";

export function useMetric(

id:string,

){

const{

metrics,

}=

useMetrics();

return metrics.find(

metric=>

metric.id===id,

);

}