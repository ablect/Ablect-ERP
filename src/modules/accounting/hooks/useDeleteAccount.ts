import {

accountService

}

from "../services/AccountService";

import {

useAccountStore

}

from "../store/AccountStore";

export function useDeleteAccount(){

async function remove(

id:string,

){

const accounts=

await accountService.delete(

id,

);

useAccountStore

.getState()

.setAccounts(

accounts,

);

}

return{

remove,

};

}