import {

usePurchaseStore

}

from "../store/PurchaseStore";

export function usePurchaseList(){

const{

purchases,

}=

usePurchaseStore();

return{

purchases,

};

}