import type {

Expense

}

from "../types/Expense";

export function createExpense(

title:string,

category:string,

amount:number,

vendor:string,

notes:string,

):Expense{

return{

id:crypto.randomUUID(),

title,

category,

amount,

vendor,

date:new Date()

.toISOString(),

notes,

};

}