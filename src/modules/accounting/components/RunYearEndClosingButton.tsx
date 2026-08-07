import Button

from "../../../components/ui/Button";

import {

useYearEndClosing

}

from "../hooks/useYearEndClosing";

export default function RunYearEndClosingButton(){

const{

closeYear,

}=

useYearEndClosing();

return(

<Button

onClick={()=>

closeYear("CURRENT")

}

>

Run Year-End Closing

</Button>

);

}