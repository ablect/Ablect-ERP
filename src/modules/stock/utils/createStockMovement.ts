import type {

StockMovement

}

from "../types/StockMovement";

export function createStockMovement(

productId: string,

reference: string,

type: "IN" | "OUT" | "ADJUSTMENT",

quantity: number,

balance: number,

): StockMovement {

return{

id:crypto.randomUUID(),

productId,

reference,

type,

quantity,

balance,

createdAt:new Date(),

};

}