import type { Customer }

from "../types/Customer";

import type {

CustomerSchema

}

from "../validation/customerSchema";

export function createCustomer(

data: CustomerSchema

): Customer {

const now =

new Date();

return{

id:crypto.randomUUID(),

...data,

createdAt:now,

updatedAt:now,

};

}