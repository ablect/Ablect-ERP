import StatCard

from "../../../components/ui/StatCard";

import {

useCustomerStore

}

from "../store/CustomerStore";

export default function CustomerStatistics(){

const{

customers,

}=useCustomerStore();

return(

<StatCard

title="Customers"

value={customers.length}

subtitle="Registered customers"

/>

);

}