import type { ReactNode } from "react";

type Props={

children:ReactNode;

};

export default function HeaderBar({

children,

}:Props){

return(

<div

className="
flex
items-center
justify-between
rounded-2xl
bg-white
border
border-slate-200
p-6
shadow-sm
"

>

{children}

</div>

);

}