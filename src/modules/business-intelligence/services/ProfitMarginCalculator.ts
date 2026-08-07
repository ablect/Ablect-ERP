export function calculateProfitMargin(

revenue:number,

profit:number,

){

if(revenue===0){

return 0;

}

return(

(profit/revenue)*100

);

}