import ExecutiveKPICard

from "./ExecutiveKPICard";

type Props={

value:number;

};

export default function ExecutiveInventoryCard({

value,

}:Props){

return(

<ExecutiveKPICard

title="Inventory"

value={`₦${value.toLocaleString()}`}

route="/analytics/inventory"

/>

);

}