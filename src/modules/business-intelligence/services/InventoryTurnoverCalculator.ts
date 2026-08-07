export function calculateInventoryTurnover(

costOfGoodsSold:number,

averageInventory:number,

){

if(averageInventory===0){

return 0;

}

return(

costOfGoodsSold/

averageInventory

);

}