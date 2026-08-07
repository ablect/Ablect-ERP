import Card

from "../../../components/ui/Card";

import PurchaseBalanceRow

from "./PurchaseBalanceRow";

type Props={

total:number;

paid:number;

balance:number;

};

export default function PurchaseBalanceSummary({

total,

paid,

balance,

}:Props){

return(

<Card>

<div className="space-y-3">

<PurchaseBalanceRow

label="Total"

value={total}

/>

<PurchaseBalanceRow

label="Paid"

value={paid}

/>

<PurchaseBalanceRow

label="Balance"

value={balance}

/>

</div>

</Card>

);

}