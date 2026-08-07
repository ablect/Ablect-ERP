import type {

YearEndClosing

}

from "../types/YearEndClosing";

let closings:YearEndClosing[]=[];

export const yearEndClosingService={

async getAll(){

return closings;

},

async save(

items:YearEndClosing[],

){

closings=items;

return closings;

},

};