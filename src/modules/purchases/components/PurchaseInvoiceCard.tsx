import Card

from "../../../components/ui/Card";

type Props={

invoice:string;

};

export default function PurchaseInvoiceCard({

invoice,

}:Props){

return(

<Card>

<p className="text-sm text-slate-500">

Invoice

</p>

<h2 className="mt-2 text-2xl font-bold">

{invoice}

</h2>

</Card>

);

}