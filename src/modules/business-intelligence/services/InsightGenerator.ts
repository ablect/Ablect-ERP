import type {

Metric

}

from "../types/Metric";

import type {

Insight

}

from "../types/Insight";

export function generateInsights(

metrics:Metric[],

):Insight[]{

const insights:Insight[]=[];

metrics.forEach(metric=>{

if(

metric.value===0

){

insights.push({

id:

`${metric.id}-empty`,

title:

`${metric.name} is zero`,

description:

`No activity recorded for ${metric.name}.`,

severity:"warning",

metricId:metric.id,

createdAt:

new Date(),

});

}

});

return insights;

}