import {

usePositions

}

from "../hooks/usePositions";

export default function PositionCount(){

const{

positions,

}=

usePositions();

return(

<p>

Total Positions: {positions.length}

</p>

);

}