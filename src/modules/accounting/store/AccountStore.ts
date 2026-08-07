import { create }

from "zustand";

import type {

Account

}

from "../types/Account";

type AccountState={

accounts:Account[];

setAccounts:(

accounts:Account[],

)=>void;

};

export const useAccountStore=

create<AccountState>((set)=>({

accounts:[],

setAccounts(

accounts,

){

set({

accounts,

});

},

}));