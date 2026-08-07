import type {

Account

}

from "../types/Account";

let accounts:Account[]=[];

export const accountService={

async getAll(){

return accounts;

},

async create(

account:Account,

){

accounts=[

...accounts,

account,

];

return accounts;

},

async update(

updated:Account,

){

accounts=

accounts.map(account=>

account.id===updated.id

?updated

:account

);

return accounts;

},

async delete(

id:string,

){

accounts=

accounts.filter(

account=>

account.id!==id,

);

return accounts;

},

};