import Card from "../../../components/ui/Card";

export default function RecentActivity(){

return(

<Card>

<h2 className="font-semibold mb-5">

Recent Activity

</h2>

<ul className="space-y-3">

<li>

Product added

</li>

<li>

Inventory adjusted

</li>

<li>

Barcode generated

</li>

<li>

Stock exported

</li>

</ul>

</Card>

);

}