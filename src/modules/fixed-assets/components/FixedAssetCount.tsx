import {

useFixedAssets

}

from "../hooks/useFixedAssets";

export default function FixedAssetCount(){

const{

assets,

}=

useFixedAssets();

return(

<p>

Total Assets:

{" "}

{assets.length}

</p>

);

}