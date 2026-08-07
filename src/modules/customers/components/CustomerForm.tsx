import Form from "../../../components/ui/Form";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

import {

useCustomerForm

}

from "../hooks/useCustomerForm";

import {

createCustomer

}

from "../utils/createCustomer";

import {

customerService

}

from "../services/CustomerService";

import {

useCustomerStore

}

from "../store/CustomerStore";

import CustomerBasicInformation

from "./CustomerBasicInformation";

export default function CustomerForm(){

const form=

useCustomerForm();

async function submit(data:any){

const customer=

createCustomer(data);

const customers=

await customerService.create(customer);

useCustomerStore

.getState()

.setCustomers(customers);

form.reset();

}

return(

<Form

onSubmit={form.handleSubmit(submit)}

>

<Card>

<div className="space-y-6">

<CustomerBasicInformation

register={form.register}

/>

<Button

type="submit"

>

Save Customer

</Button>

</div>

</Card>

</Form>

);

}