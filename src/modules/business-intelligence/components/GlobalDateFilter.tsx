import DatePresetSelector

from "./DatePresetSelector";

import CustomDatePicker

from "./CustomDatePicker";

export default function GlobalDateFilter(){

return(

<div className="flex flex-wrap gap-4">

<DatePresetSelector/>

<CustomDatePicker/>

</div>

);

}