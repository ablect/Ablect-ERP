import { generateBarcode } from "./generateBarcode";
import { generateSKU } from "./generateSKU";

export function productDefaults() {

  return {

    name: "",

    sku: generateSKU("PRD"),

    barcode: generateBarcode(),

    categoryId: "",

    brandId: "",

    unitId: "",

    costPrice: 0,

    sellingPrice: 0,

    quantity: 0,

    minimumStock: 0,

    description: "",

  };

}