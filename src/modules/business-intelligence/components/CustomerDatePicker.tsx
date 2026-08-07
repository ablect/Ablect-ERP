import {

useDateRange

}

from "../hooks/useDateRange";

export default function CustomDatePicker(){

const{

range,

setRange,

}=

useDateRange();

if(

range.preset!=="custom"

){

return null;

}

return(

<div className="flex gap-3">

<input

type="date"

onChange={e=>

setRange({

...range,

from:new Date(e.target.value),

})

}

/>

<input

type="date"

onChange={e=>

setRange({

...range,

to:new Date(e.target.value),

})

}

/>

</div>

);

}