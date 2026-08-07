import Card from "../../../components/ui/Card";

export default function OutstandingInvoicesCard(){

return(

<Card>

<h3 className="text-lg font-semibold">

Outstanding Invoices

</h3>

<div className="mt-6">

<p>

18 invoices pending

</p>

<h2 className="mt-2 text-3xl font-bold">

₦2,850,000

</h2>

</div>

</Card>

);

}