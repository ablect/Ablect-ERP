import { useEffect } from "react";

import {

brandService

}

from "../services/BrandService";

import {

useBrandStore

}

from "../store/BrandStore";

export function useBrands(){

const{

brands,

setBrands

}=useBrandStore();

useEffect(()=>{

brandService

.getAll()

.then(setBrands);

},[setBrands]);

return{

brands

};

}