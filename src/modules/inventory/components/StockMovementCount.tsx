import {

useStockMovements

}

from "../hooks/useStockMovements";

export default function StockMovementCount(){

const{

movements,

}=

useStockMovements();

return(

<p>

Total Movements:

{" "}

{movements.length}

</p>

);

}