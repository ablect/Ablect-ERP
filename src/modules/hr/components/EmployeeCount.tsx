import {

useEmployees

}

from "../hooks/useEmployees";

export default function EmployeeCount(){

const{

employees,

}=

useEmployees();

return(

<p>

Total Employees:

{" "}

{employees.length}

</p>

);

}