type Props={

reference:string;

};

export default function PurchaseReference({

reference,

}:Props){

return(

<span className="font-semibold">

{reference}

</span>

);

}