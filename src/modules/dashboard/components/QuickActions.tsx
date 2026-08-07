import Button from "../../../components/ui/Button";

export default function QuickActions(){

return(

<div className="flex flex-wrap gap-4">

<Button>

+ New Product

</Button>

<Button variant="secondary">

New Sale

</Button>

<Button variant="secondary">

Receive Stock

</Button>

<Button variant="secondary">

Print Barcode

</Button>

</div>

);

}