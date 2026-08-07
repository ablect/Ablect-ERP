import Button

from "../../../components/ui/Button";

type Props={

onApprove:()=>void;

};

export default function ApprovePayrollButton({

onApprove,

}:Props){

return(

<Button

onClick={onApprove}

>

Approve Payroll

</Button>

);

}