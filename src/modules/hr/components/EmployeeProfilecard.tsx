import Card

from "../../../components/ui/Card";

import type {

Employee

}

from "../types/Employee";

type Props={

employee:Employee;

};

export default function EmployeeProfileCard({

employee,

}:Props){

return(

<Card>

<div className="space-y-2">

<h2 className="text-xl font-semibold">

{employee.firstName}

{" "}

{employee.lastName}

</h2>

<p>

{employee.position}

</p>

<p>

{employee.department}

</p>

<p>

{employee.email}

</p>

<p>

{employee.phone}

</p>

</div>

</Card>

);

}