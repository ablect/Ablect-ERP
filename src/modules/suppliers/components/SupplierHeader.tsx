import SectionTitle

from "../../../components/ui/SectionTitle";

type Props={

title:string;

description:string;

};

export default function SupplierHeader({

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