import type { BusinessInsight } from "../types/BusinessInsight";

export function generateBusinessInsights(

revenue:number,

expenses:number,

inventory:number,

customers:number,

):BusinessInsight[]{

const insights:BusinessInsight[]=[];

if(revenue<expenses){

insights.push({

id:"finance-loss",

title:"Expenses exceed revenue",

description:

"The company is currently spending more than it earns.",

severity:"high",

category:"finance",

recommendation:

"Reduce operating expenses or increase sales immediately.",

});

}

if(inventory===0){

insights.push({

id:"inventory-empty",

title:"Inventory exhausted",

description:

"There are no products left in inventory.",

severity:"high",

category:"inventory",

recommendation:

"Restock inventory to avoid stock-out.",

});

}

if(customers<10){

insights.push({

id:"customer-growth",

title:"Low customer base",

description:

"Customer acquisition is below target.",

severity:"medium",

category:"customers",

recommendation:

"Run marketing campaigns and promotions.",

});

}

return insights;

}