import {

useSupplierStore

}

from "../store/SupplierStore";

export function useSupplierList(){

const{

suppliers,

}=

useSupplierStore();

return{

suppliers,

};

}