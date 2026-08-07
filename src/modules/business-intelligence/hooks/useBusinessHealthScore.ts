import { useExecutiveDashboard } from "./useExecutiveDashboard";

export function useBusinessHealthScore(){

const dashboard=

useExecutiveDashboard();

let score=100;

if(

dashboard.cashPosition<100000

){

score-=20;

}

if(

dashboard.inventoryValue===0

){

score-=20;

}

if(

dashboard.customerCount<10

){

score-=15;

}

return{

score,

};

}