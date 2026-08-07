import { create } from "zustand";
import type { Product } from "../types/Product";

type ProductState={

products:Product[];

selectedProduct:Product|null;

setProducts(
products:Product[]
):void;

selectProduct(
product:Product|null
):void;

};

export const useProductStore=
create<ProductState>((set)=>({

products:[],

selectedProduct:null,

setProducts(products){

set({

products

});

},

selectProduct(product){

set({

selectedProduct:product

});

}

}));