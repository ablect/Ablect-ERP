import {

useDateRange

}

from "../hooks/useDateRange";

export default function DatePresetSelector(){

const{

range,

setRange,

}=

useDateRange();

return(

<select

value={range.preset}

onChange={e=>

setRange({

...range,

preset:e.target.value as any,

})

}

>

<option value="today">

Today

</option>

<option value="yesterday">

Yesterday

</option>

<option value="last7Days">

Last 7 Days

</option>

<option value="last30Days">

Last 30 Days

</option>

<option value="thisMonth">

This Month

</option>

<option value="lastMonth">

Last Month

</option>

<option value="thisQuarter">

This Quarter

</option>

<option value="thisYear">

This Year

</option>

<option value="custom">

Custom

</option>

</select>

);

}