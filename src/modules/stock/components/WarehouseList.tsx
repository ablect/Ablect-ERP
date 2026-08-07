import Card
from "../../../components/ui/Card";

import {
  useWarehouses
}
from "../hooks/useWarehouses";

export default function WarehouseList() {

  const {

    warehouses,

  } = useWarehouses();

  return (

    <Card>

      <h2 className="text-lg font-semibold">

        Warehouses

      </h2>

      <div className="mt-4 space-y-2">

        {warehouses.map(

          warehouse => (

            <div

              key={warehouse.id}

            >

              {warehouse.name}

            </div>

          )

        )}

      </div>

    </Card>

  );

}