export interface ExecutiveSummary{

totalRevenue:number;

netProfit:number;

cashPosition:number;

inventoryValue:number;

customerCount:number;

businessHealth:number;

}

export function buildExecutiveSummary(

summary:ExecutiveSummary,

){

return{

...summary,

generatedAt:new Date(),

};

}