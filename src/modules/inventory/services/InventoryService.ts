import type { InventoryItem } from "../types/InventoryItem";
import { requireDesktopApi } from "../../../lib/desktopApi";

function getStockStatus(quantity:number,reorderLevel:number):InventoryItem["status"]{if(quantity<=0)return "Out of Stock";if(quantity<=reorderLevel)return "Low Stock";return "In Stock";}
function mapProduct(row:unknown):InventoryItem{const p=row as Record<string,unknown>;const quantity=Number(p.quantity??0);const reorderLevel=Number(p.minimum_stock??p.reorderLevel??0);return{id:String(p.id),sku:String(p.sku??""),barcode:String(p.barcode??""),itemName:String(p.itemName??p.name??""),category:String(p.category??"General"),warehouse:String(p.warehouse??""),unit:String(p.unit??"PCS"),quantity,reorderLevel,unitCost:Number(p.unitCost??p.cost_price??0),sellingPrice:Number(p.sellingPrice??p.selling_price??0),status:getStockStatus(quantity,reorderLevel),brand:String(p.brand??""),description:String(p.description??""),imageUrl:String(p.imageUrl??p.image_url??"")};}
export const inventoryService={
 async getAll():Promise<InventoryItem[]>{return (await requireDesktopApi().erp.products.list()).map(mapProduct);},
 async create(item:InventoryItem):Promise<InventoryItem[]>{return (await requireDesktopApi().erp.products.create(item) as unknown[]).map(mapProduct);},
 async update(item:InventoryItem):Promise<InventoryItem[]>{return (await requireDesktopApi().erp.products.update(item) as unknown[]).map(mapProduct);},
 async delete(id:string):Promise<InventoryItem[]>{return (await requireDesktopApi().erp.products.delete(id) as unknown[]).map(mapProduct);},
 async receiveStock(productId:string,quantity:number):Promise<InventoryItem[]>{if(quantity<=0)throw new Error("Stock quantity must be greater than zero.");const items=await this.getAll();const product=items.find((item)=>item.id===productId);if(!product)throw new Error("Product not found in inventory.");return this.update({...product,quantity:product.quantity+quantity});},
 async issueStock(productId:string,quantity:number):Promise<InventoryItem[]>{if(quantity<=0)throw new Error("Stock quantity must be greater than zero.");const items=await this.getAll();const product=items.find((item)=>item.id===productId);if(!product)throw new Error("Product not found in inventory.");if(product.quantity<quantity)throw new Error(`Insufficient stock for ${product.itemName}. Available: ${product.quantity}.`);return this.update({...product,quantity:product.quantity-quantity});},
};
