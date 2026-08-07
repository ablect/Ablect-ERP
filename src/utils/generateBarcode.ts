import JsBarcode from "jsbarcode";

export function generateBarcode(
  svg: SVGSVGElement,
  value: string
) {
  JsBarcode(svg, value, {
    displayValue: true,
    height: 40,
    width: 2,
  });
}