import {

createTransaction,

}

from "../utils/createTransaction";

export const inventoryTransactionService = {

create(data: Parameters<typeof createTransaction>[0]) {

return createTransaction(data);

},

};