import JsBarcode from "jsbarcode";

export class BarcodeService{

generate(

element:SVGSVGElement,

value:string

){

JsBarcode(

element,

value,

{

displayValue:true,

height:60,

width:2

}

);

}

}

export const barcodeService=new BarcodeService();