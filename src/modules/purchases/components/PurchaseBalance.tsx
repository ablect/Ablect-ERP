type Props={

balance:number;

};

export default function PurchaseBalance({

balance,

}:Props){

return(

<span>

₦{balance.toLocaleString()}

</span>

);

}