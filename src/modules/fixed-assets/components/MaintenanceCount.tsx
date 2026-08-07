import {

useMaintenanceRecords

}

from "../hooks/useMaintenanceRecords";

export default function MaintenanceCount(){

const{

records,

}=

useMaintenanceRecords();

return(

<p>

Total Maintenance Records:

{" "}

{records.length}

</p>

);

}