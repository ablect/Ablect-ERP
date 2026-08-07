import {

useDepartments

}

from "../hooks/useDepartments";

export default function DepartmentCount(){

const{

departments,

}=

useDepartments();

return(

<p>

Total Departments:

{" "}

{departments.length}

</p>

);

}