import Button

from "../../../components/ui/Button";

type Props={

onDelete:()=>void;

};

export default function DepreciationActions({

onDelete,

}:Props){

return(

<div className="flex gap-2">

<Button

onClick={onDelete}

>

Delete

</Button>

</div>

);

}