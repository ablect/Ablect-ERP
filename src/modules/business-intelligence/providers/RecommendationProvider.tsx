import type {

ReactNode

}

from "react";

import {

useLoadRecommendations

}

from "../hooks/useLoadRecommendations";

type Props={

children:ReactNode;

};

export default function RecommendationProvider({

children,

}:Props){

useLoadRecommendations();

return<>

{children}

</>;

}