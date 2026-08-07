import type { Unit }

from "../types/Unit";

import {

UnitMemoryRepository

}

from "../repositories/UnitMemoryRepository";

const repository =

new UnitMemoryRepository();

export const unitService = {

getAll() {

return repository.getAll();

},

create(

unit: Unit

) {

return repository.create(unit);

},

};