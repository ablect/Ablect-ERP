import Card from "../../../components/ui/Card";

import type { Customer }

from "../types/Customer";

type Props={

customer:Customer;

};

export default function CustomerDetailsCard({

customer,

}:Props){

return(

<Card>

<div className="space-y-3">

<h2 className="text-2xl font-semibold">

{customer.name}

</h2>

<p>

Email: {customer.email}

</p>

<p>

Phone: {customer.phone}

</p>

<p>

Address: {customer.address}

</p>

</div>

</Card>

);

}