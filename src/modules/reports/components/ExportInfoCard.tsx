import Card

from "../../../components/ui/Card";

export default function ExportInfoCard(){

return(

<Card>

<h2 className="text-lg font-semibold">

Export Formats

</h2>

<ul className="mt-4 space-y-2 text-sm">

<li>

CSV

</li>

<li>

Excel

</li>

<li>

PDF

</li>

</ul>

</Card>

);

}