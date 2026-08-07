import type {

RecommendationStatus

}

from "../types/RecommendationStatus";

type Props={

status:RecommendationStatus;

};

export default function RecommendationStatusBadge({

status,

}:Props){

return(

<span className="rounded border px-2 py-1 text-xs">

{status}

</span>

);

}