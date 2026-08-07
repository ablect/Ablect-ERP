import type { Customer } from "../types/Customer";

import {

CustomerMemoryRepository

}

from "../repositories/CustomerMemoryRepository";

const repository =

new CustomerMemoryRepository();

export const customerService = {

getAll() {

return repository.getAll();

},

create(

customer: Customer

) {

return repository.create(customer);

},

};