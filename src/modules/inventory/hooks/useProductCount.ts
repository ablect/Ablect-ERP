import {
useFilteredProducts
}
from "./useFilteredProducts";

export function useProductCount(){

const{

products

}=useFilteredProducts();

return{

count:

products.length

};

}