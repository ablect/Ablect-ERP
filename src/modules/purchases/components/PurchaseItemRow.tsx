import Input

from "../../../components/ui/Input";

import ProductSelect

from "./ProductSelect";

import PurchaseItemTotal

from "./PurchaseItemTotal";

type Props={

index:number;

register:any;

watch:any;

setValue:any;

};

export default function PurchaseItemRow({

index,

register,

watch,

setValue,

}:Props){

const quantity=

watch(

`items.${index}.quantity`

)??0;

const unitCost=

watch(

`items.${index}.unitCost`

)??0;

return(

<div className="grid gap-4 md:grid-cols-5">

<ProductSelect

value={

watch(

`items.${index}.productId`

)

}

onChange={(value)=>

setValue(

`items.${index}.productId`,

value

)

}

/>

<Input

label="Quantity"

type="number"

{...register(

`items.${index}.quantity`,

{

valueAsNumber:true,

}

)}

/>

<Input

label="Unit Cost"

type="number"

{...register(

`items.${index}.unitCost`,

{

valueAsNumber:true,

}

)}

/>

<PurchaseItemTotal

quantity={quantity}

unitCost={unitCost}

/>

</div>

);

}