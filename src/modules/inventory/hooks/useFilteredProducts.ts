import { useMemo } from "react";

import { useProductList }
from "./useProductList";

import {
useProductSearchStore
}
from "../store/ProductSearchStore";

import {
productSearch
}
from "../utils/productSearch";

export function useFilteredProducts(){

const{

products

}=useProductList();

const{

keyword

}=useProductSearchStore();

const filteredProducts=

useMemo(()=>{

return productSearch(

products,

keyword

);

},

[

products,

keyword

]);

return{

products:

filteredProducts

};

}