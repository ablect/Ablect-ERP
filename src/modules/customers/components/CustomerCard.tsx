import Card from "../../../components/ui/Card";
import type { Customer } from "../types/Customer";

type Props = {

  customer: Customer;

};

export default function CustomerCard({

  customer,

}: Props) {

  return (

    <Card>

      <h3 className="font-semibold">

        {customer.name}

      </h3>

      <p className="mt-2 text-slate-500">

        {customer.email}

      </p>

      <p className="text-slate-500">

        {customer.phone}

      </p>

    </Card>

  );

}