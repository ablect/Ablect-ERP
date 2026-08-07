import {

useEffect

}

from "react";

import {

useAllMetrics

}

from "../hooks/useAllMetrics";

import {

useMetricsStore

}

from "../store/MetricsStore";

type Props={

children:

React.ReactNode;

};

export default function MetricsProvider({

children,

}:Props){

const metrics=

useAllMetrics();

const{

setMetrics,

}=

useMetricsStore();

useEffect(()=>{

setMetrics(

metrics,

);

},[

metrics,

setMetrics,

]);

return<>

{children}

</>;

}