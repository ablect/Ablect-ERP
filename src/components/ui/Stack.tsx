import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

type Props={

children:ReactNode;

className?:string;

};

export default function Stack({

children,

className,

}:Props){

return(

<div
className={cn(
"space-y-6",
className
)}
>

{children}

</div>

);

}