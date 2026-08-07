import GenerateDepreciationButton
from "./GenerateDepreciationButton";

import PostDepreciationButton
from "./PostDepreciationButton";

export default function DepreciationToolbar(){

return(

<div className="flex gap-3">

<GenerateDepreciationButton/>

<PostDepreciationButton/>

</div>

);

}