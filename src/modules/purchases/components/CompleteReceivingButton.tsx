import Button

from "../../../components/ui/Button";

import {

useReceivePurchase

}

from "../hooks/useReceivePurchase";

type Props={

grnId:string;

purchaseOrderId:string;

productId:string;

warehouseId:string;

quantity:number;

};

export default function CompleteReceivingButton({

grnId,

purchaseOrderId,

productId,

warehouseId,

quantity,

}:Props){

const{

complete,

}=

useReceivePurchase();

return(

<Button

onClick={()=>

complete(

grnId,

purchaseOrderId,

productId,

warehouseId,

quantity,

)

}

>

Complete Receiving

</Button>

);

}