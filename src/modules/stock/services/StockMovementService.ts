import type {

StockMovement

}

from "../types/StockMovement";

import {

StockMovementMemoryRepository

}

from "../repositories/StockMovementMemoryRepository";

const repository =

new StockMovementMemoryRepository();

export const stockMovementService = {

getAll() {

return repository.getAll();

},

create(

movement: StockMovement

) {

return repository.create(

movement

);

},

};