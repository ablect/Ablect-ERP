import Button

from "../../../components/ui/Button";

import {

useReceiveGoods

}

from "../hooks/useReceiveGoods";

type Props={

id:string;

};

export default function ReceiveGoodsButton({

id,

}:Props){

const{

receive,

}=

useReceiveGoods();

return(

<Button

onClick={()=>

receive(id)

}

>

Receive

</Button>

);

}