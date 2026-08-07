export function calculateStraightLineDepreciation(

purchaseCost:number,

salvageValue:number,

usefulLife:number,

){

return(

purchaseCost-

salvageValue

)/

usefulLife;

}