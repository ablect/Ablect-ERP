import ExecutiveKPICard

from "./ExecutiveKPICard";

type Props={

value:number;

};

export default function ExecutiveCustomerCard({

value,

}:Props){

return(

<ExecutiveKPICard

title="Customers"

value={value.toLocaleString()}

route="/analytics/customers"

/>

);

}