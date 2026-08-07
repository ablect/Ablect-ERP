import Button

from "../../../components/ui/Button";

type Props={

onReject:()=>void;

};

export default function RejectLeaveButton({

onReject,

}:Props){

return(

<Button

onClick={onReject}

>

Reject

</Button>

);

}