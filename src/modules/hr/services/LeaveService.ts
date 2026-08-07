import type {

LeaveRequest

}

from "../types/LeaveRequest";

let requests:LeaveRequest[]=[];

export const leaveService={

async getAll(){

return requests;

},

async create(

request:LeaveRequest,

){

requests=[

...requests,

request,

];

return requests;

},

async delete(

id:string,

){

requests=

requests.filter(

request=>

request.id!==id,

);

return requests;

},

};