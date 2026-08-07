export function unitsOfProductionDepreciation(

cost:number,

salvage:number,

totalUnits:number,

unitsProduced:number,

){

return(

(cost-salvage)

/totalUnits

)

*

unitsProduced;

}