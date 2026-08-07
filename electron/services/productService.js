import db from "../database/db.js";

export function getProducts() {

return db.prepare("SELECT * FROM products").all();

}

export function addProduct(product){

const stmt=db.prepare(`

INSERT INTO products(

barcode,

name,

category,

unit,

costPrice,

sellingPrice,

quantity,

minimumStock

)

VALUES(

@barcode,

@name,

@category,

@unit,

@costPrice,

@sellingPrice,

@quantity,

@minimumStock

)

`);

return stmt.run(product);

}