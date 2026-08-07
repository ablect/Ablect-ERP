import type {

ReactNode

}

from "react";

import {

useGenerateInsights

}

from "../hooks/useGenerateInsights";

type Props={

children:ReactNode;

};

export default function InsightsProvider({

children,

}:Props){

useGenerateInsights();

return<>

{children}

</>;

}