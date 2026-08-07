import Button
from "../../../components/ui/Button";

import {

useGenerateDepreciation

}

from "../hooks/useGenerateDepreciation";

export default function GenerateDepreciationButton(){

const{

generate,

}=

useGenerateDepreciation();

return(

<Button

onClick={generate}

>

Generate Depreciation

</Button>

);

}