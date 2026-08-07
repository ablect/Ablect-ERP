export function getPurchaseStatus(

total: number,

balance: number,

){

if(balance<=0){

return "Paid";

}

if(balance===total){

return "Draft";

}

return "Partial";

}