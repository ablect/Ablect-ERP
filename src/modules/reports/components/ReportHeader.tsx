import SectionTitle

from "../../../components/ui/SectionTitle";

type Props={

title:string;

description:string;

};

export default function ReportHeader({

title,

description,

}:Props){

return(

<SectionTitle

title={title}

subtitle={description}

/>

);

}