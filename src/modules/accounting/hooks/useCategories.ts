import {

useTaxStore

}

from "../store/TaxStore";

export function useTaxCategories(){

const{

categories,

setCategories,

}=

useTaxStore();

return{

categories,

setCategories,

};

}