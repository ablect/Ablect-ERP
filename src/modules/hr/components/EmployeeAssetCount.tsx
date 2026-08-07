import {

useEmployeeAssets

}

from "../hooks/useEmployeeAssets";

export default function EmployeeAssetCount(){

const{

assets,

}=

useEmployeeAssets();

return(

<p>

Total Assets:

{" "}

{assets.length}

</p>

);

}