import {

isPositiveAdjustment

}

from "../utils/isPositiveAdjustment";

import type {

StockAdjustment

}

from "../types/StockAdjustment";

type Props={

adjustment:StockAdjustment;

};

export default function AdjustmentBadge({

adjustment,

}:Props){

return(

<span

className={

isPositiveAdjustment(adjustment)

? "rounded bg-green-100 px-2 py-1 text-green-700"

: "rounded bg-red-100 px-2 py-1 text-red-700"

}

>

{

isPositiveAdjustment(adjustment)

? "Increase"

: "Decrease"

}

</span>

);

}