import Button

from "../../../components/ui/Button";

type Props={

onClick:()=>void;

};

export default function PurchasePaymentButton({

onClick,

}:Props){

return(

<Button

onClick={onClick}

>

Record Payment

</Button>

);

}