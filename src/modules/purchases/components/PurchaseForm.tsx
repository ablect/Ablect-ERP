import Form from "../../../components/ui/Form";

import Card from "../../../components/ui/Card";

import Button from "../../../components/ui/Button";
import {

usePurchaseCalculator

}

from "../hooks/usePurchaseCalculator";
import PurchaseTotals

from "./PurchaseTotals";
import {

completePurchase

}

from "../utils/completePurchase";
import PurchaseItems

from "./PurchaseItems";
import {

usePurchaseForm

}

from "../hooks/usePurchaseForm";

import {

createPurchase

}

from "../utils/createPurchase";

import {

purchaseService

}

from "../services/PurchaseService";

import {

usePurchaseStore

}

from "../store/PurchaseStore";

import PurchaseBasicInformation

from "./PurchaseBasicInformation";

export default function PurchaseForm(){

const form=

usePurchaseForm();
const items=

form.watch(

"items"

);

const{

subtotal,

}=

usePurchaseCalculator(

items

);
async function submit(data:any){

const purchase=

createPurchase(data);
completePurchase(

purchase.invoiceNumber,

data.items

);const purchases=

await purchaseService.create(

purchase

);

usePurchaseStore

.getState()

.setPurchases(

purchases

);

form.reset();

}

return(

<Form

onSubmit={form.handleSubmit(submit)}

>

<Card>

<div className="space-y-6">

<PurchaseBasicInformation

register={form.register}

/>
<PurchaseItems

register={form.register}

watch={form.watch}

setValue={form.setValue}

/>
<PurchaseTotals

total={subtotal}

/>
<Button

type="submit"

>

Save Purchase

</Button>

</div>

</Card>

</Form>

);

}