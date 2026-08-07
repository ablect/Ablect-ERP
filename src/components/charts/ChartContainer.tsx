import type { ReactNode }

from "react";

type Props={

children:ReactNode;

height?:number;

};

export default function ChartContainer({

children,

height=350,

}:Props){

return(

<div

style={{

width:"100%",

height,

}}

>

{children}

</div>

);

}