import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

type Props={

children:ReactNode;

className?:string;

};

export default function Section({

children,

className,

}:Props){

return(

<section
className={cn(
"rounded-3xl bg-white p-8 shadow-sm border border-slate-200",
className
)}
>

{children}

</section>

);

}