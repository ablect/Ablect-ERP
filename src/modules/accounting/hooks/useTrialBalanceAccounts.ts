import {

useAccounts

}

from "./useAccounts";

export function useTrialBalanceAccounts(){

const{

accounts,

}=

useAccounts();

return accounts.filter(

account=>account.active,

);

}