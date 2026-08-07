import {

useAccountingLedger

}

from "./useAccountingLedger";

import {

groupLedgerEntries

}

from "../utils/groupLedgerEntries";

export function useGroupedLedger(){

const{

entries,

}=

useAccountingLedger();

return groupLedgerEntries(

entries,

);

}