import type {

Metric

}

from "../types/Metric";

export function createMetric(

id:string,

name:string,

value:number,

unit:string,

category:string,

):Metric{

return{

id,

name,

value,

formattedValue:

`${unit}${value.toLocaleString()}`,

unit,

category,

updatedAt:

new Date(),

};

}