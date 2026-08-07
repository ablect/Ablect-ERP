import { useEffect } from "react";

import {
categoryService
}
from "../services/CategoryService";

import {
useCategoryStore
}
from "../store/CategoryStore";

export function useCategories(){

const{

categories,

setCategories

}=useCategoryStore();

useEffect(()=>{

categoryService

.getAll()

.then(setCategories);

},[setCategories]);

return{

categories

};

}