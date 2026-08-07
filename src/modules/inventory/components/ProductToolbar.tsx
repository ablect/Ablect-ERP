import { useState } from "react";

import ProductSearch from "./ProductSearch";
import ProductFilter from "./ProductFilter";
import AddProductButton from "./AddProductButton";

export default function ProductToolbar(){

const[search,setSearch]=useState("");

const[brand,setBrand]=useState("all");

return(

<div className="flex flex-wrap gap-4 items-center justify-between">

<div className="flex gap-3">

<ProductSearch

value={search}

onChange={setSearch}

/>

<ProductFilter

value={brand}

onChange={setBrand}

/>

</div>

<AddProductButton/>

</div>

);

}