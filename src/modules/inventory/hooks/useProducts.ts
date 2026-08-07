import { useEffect,useState } from "react";

import { productService } from "../services/ProductService";

export function useProducts(){

const[products,setProducts]=

useState(productService.getAll());

useEffect(()=>{

setProducts(productService.getAll());

},[]);

return{

products

};

}