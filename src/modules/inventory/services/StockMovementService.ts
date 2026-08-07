import type {

StockMovement

}

from "../types/StockMovement";

let movements:StockMovement[]=[];

export const stockMovementService={

async getAll(){

return movements;

},

async create(

movement:StockMovement,

){

movements=[

...movements,

movement,

];

return movements;

},

async delete(

id:string,

){

movements=

movements.filter(

movement=>

movement.id!==id,

);

return movements;

},

};