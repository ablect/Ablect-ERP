import type {

JournalLine

}

from "../types/JournalLine";

let lines:JournalLine[]=[];

export const journalLineService={

async getAll(){

return lines;

},

async create(

line:JournalLine,

){

lines=[

...lines,

line,

];

return lines;

},

};