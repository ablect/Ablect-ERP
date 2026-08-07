import type {

KPIItem

}

from "../types/KPIItem";

export function sortKPIs(

items:KPIItem[],

){

return[

...items,

].sort(

(a,b)=>

a.priority-b.priority,

);

}