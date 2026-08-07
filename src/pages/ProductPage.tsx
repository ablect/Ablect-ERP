import { useState } from "react";

import type { Product } from "../models/Product";

import ProductTable from "../components/products/ProductTable";

import PageTitle from "../components/common/PageTitle";

import SearchBar from "../components/common/SearchBar";

import PrimaryButton from "../components/common/PrimaryButton";

export default function ProductPage(){

const [products]=useState<Product[]>([

{

id:1,

barcode:"100001",

sku:"SKU001",

name:"Sample Product",

category:"General",

brand:"Ablect",

unit:"PCS",

costPrice:100,

sellingPrice:150,

quantity:50,

minimumStock:5

}

])

return(

<>

<PageTitle

title="Products"

subtitle="Manage all inventory products."

/>

<SearchBar

placeholder="Search by barcode, name or SKU..."

/>

<div style={{marginBottom:20}}>

<PrimaryButton

text="Add Product"

/>

</div>

<ProductTable

products={products}

/>

</>

)

}