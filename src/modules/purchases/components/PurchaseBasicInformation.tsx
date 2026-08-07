import Input from "../../../components/ui/Input";

type Props={

register:any;

};

export default function PurchaseBasicInformation({

register,

}:Props){

return(

<div className="grid gap-4 md:grid-cols-2">

<Input

label="Supplier ID"

{...register("supplierId")}

/>

<Input

label="Invoice Number"

{...register("invoiceNumber")}

/>

<Input

label="Purchase Date"

type="date"

{...register("purchaseDate")}

/>

<Input

label="Total Amount"

type="number"

{...register("totalAmount",{

valueAsNumber:true,

})}

/>

</div>

);

}