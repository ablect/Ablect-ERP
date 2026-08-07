import type { ReactNode } from "react";
import Container from "./Container";
import Stack from "./Stack";

type Props={

children:ReactNode;

};

export default function Page({

children,

}:Props){

return(

<Container>

<Stack>

{children}

</Stack>

</Container>

);

}