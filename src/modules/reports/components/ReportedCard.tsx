import StatCard
from "../../../components/ui/StatCard";

type Props={

title:string;

value:number;

};

export default function ReportCard({

title,

value,

}:Props){

return(

<StatCard

title={title}

value={`₦${value.toLocaleString()}`}

/>

);

}