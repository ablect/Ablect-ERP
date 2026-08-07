import SectionTitle

from "../../../components/ui/SectionTitle";

type Props={

title:string;

description:string;

};

export default function ExpenseHeader({

title,

description,

}:Props){

return(

<SectionTitle

title={title}

description={description}

/>

);

}