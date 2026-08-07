import type {

ReactNode

}

from "react";

import {

useGenerateRecommendations

}

from "../hooks/useGenerateRecommendations";

type Props={

children:ReactNode;

};

export default function RecommendationsProvider({

children,

}:Props){

useGenerateRecommendations();

return<>

{children}

</>;

}