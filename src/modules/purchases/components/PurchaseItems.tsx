import Button

from "../../../components/ui/Button";

import PurchaseItemRow

from "./PurchaseItemRow";

import {

usePurchaseItems

}

from "../hooks/usePurchaseItems";

type Props={

register:any;

watch:any;

setValue:any;

};

export default function PurchaseItems({

register,

watch,

setValue,

}:Props){

const{

items,

addItem,

removeItem,

}=

usePurchaseItems();

return(

<div className="space-y-6">

<div className="flex items-center justify-between">

<h2 className="text-lg font-semibold">

Purchase Items

</h2>

<Button

type="button"

onClick={addItem}

>

Add Item

</Button>

</div>

{items.map((item,index)=>(

<div

key={item.id}

className="rounded-xl border p-4"

>

<PurchaseItemRow

index={index}

register={register}

watch={watch}

setValue={setValue}

/>

{items.length>1&&(

<Button

type="button"

onClick={()=>removeItem(index)}

>

Remove

</Button>

)}

</div>

))}

</div>

);

}