import ExecutiveKPICard

from "./ExecutiveKPICard";

type Props={

value:number;

};

export default function ExecutiveSupplierCard({

value,

}:Props){

return(

<ExecutiveKPICard

title="Suppliers"

value={`${value.toFixed(1)}/5`}

route="/analytics/suppliers"

/>

);

}