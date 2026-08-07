import type {

Position

}

from "../types/Position";

let positions:Position[]=[];

export const positionService={

async getAll(){

return positions;

},

async create(

position:Position,

){

positions=[

...positions,

position,

];

return positions;

},

async delete(

id:string,

){

positions=

positions.filter(

position=>

position.id!==id,

);

return positions;

},

};