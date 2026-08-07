import CustomerSearch

from "./CustomerSearch";

import CreateCustomerButton

from "./CreateCustomerButton";

export default function CustomerToolbar(){

return(

<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

<CustomerSearch/>

<CreateCustomerButton/>

</div>

);

}