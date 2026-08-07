export function getTrend(

current:number,

previous:number,

){

if(current>previous){

return"up";

}

if(current<previous){

return"down";

}

return"flat";

}