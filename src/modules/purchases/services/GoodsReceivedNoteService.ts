import type {

GoodsReceivedNote

}

from "../types/GoodsReceivedNote";

let notes:GoodsReceivedNote[]=[];

export const goodsReceivedNoteService={

async getAll(){

return notes;

},

async create(

note:GoodsReceivedNote,

){

notes=[

...notes,

note,

];

return notes;

},

async update(

updated:GoodsReceivedNote,

){

notes=

notes.map(item=>

item.id===updated.id

?updated

:item

);

return notes;

},

async delete(

id:string,

){

notes=

notes.filter(item=>

item.id!==id

);

return notes;

},

};