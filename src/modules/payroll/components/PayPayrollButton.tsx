import Button

from "../../../components/ui/Button";

type Props={

onPay:()=>void;

};

export default function PayPayrollButton({

onPay,

}:Props){

return(

<Button

onClick={onPay}

>

Mark as Paid

</Button>

);

}