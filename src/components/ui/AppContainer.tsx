import type { ReactNode } from "react";

type Props={

children:ReactNode;

};

export default function AppContainer({

children,

}:Props){

return(

<div className="mx-auto max-w-[1600px] p-8">

{children}

</div>

);

}