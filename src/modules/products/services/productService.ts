import type { Product } from "../types/product";

export const demoProducts: Product[] = [

{
id:"1",
barcode:"100001",
sku:"ABL001",
name:"5KVA Hybrid Inverter",
category:"Inverter",
brand:"Deye",
unit:"PCS",
quantity:8,
costPrice:450000,
sellingPrice:520000,
reorderLevel:3
},

{
id:"2",
barcode:"100002",
sku:"ABL002",
name:"550W Solar Panel",
category:"Solar Panel",
brand:"Jinko",
unit:"PCS",
quantity:75,
costPrice:80000,
sellingPrice:96000,
reorderLevel:20
},

{
id:"3",
barcode:"100003",
sku:"ABL003",
name:"5.12kWh Lithium Battery",
category:"Battery",
brand:"Dyness",
unit:"PCS",
quantity:10,
costPrice:650000,
sellingPrice:760000,
reorderLevel:2
}

];