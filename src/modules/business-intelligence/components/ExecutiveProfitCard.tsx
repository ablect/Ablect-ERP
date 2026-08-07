import ExecutiveKPICard

from "./ExecutiveKPICard";

type Props={

value:number;

};

export default function ExecutiveProfitCard({

value,

}:Props){

return(

<ExecutiveKPICard

title="Net Profit"

value={`₦${value.toLocaleString()}`}

route="/accounting/profit-loss"

/>

);

}