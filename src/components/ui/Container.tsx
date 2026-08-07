import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

type Props={
children:ReactNode;
className?:string;
};

export default function Container({
children,
className,
}:Props){

return(

<div
className={cn(
"mx-auto w-full max-w-[1600px] px-8",
className
)}
>

{children}

</div>

);

}