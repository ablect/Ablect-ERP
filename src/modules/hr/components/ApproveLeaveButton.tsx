import Button

from "../../../components/ui/Button";

type Props={

onApprove:()=>void;

};

export default function ApproveLeaveButton({

onApprove,

}:Props){

return(

<Button

onClick={onApprove}

>

Approve

</Button>

);

}