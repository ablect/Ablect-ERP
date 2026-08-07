import { getStockStatus } from "../utils/getStockStatus";

type Props = {

  quantity: number;

};

export default function StockBadge({

  quantity,

}: Props) {

  const status =

    getStockStatus(quantity);

  const style =

    status === "In Stock"

      ? "bg-green-100 text-green-700"

      : status === "Low Stock"

      ? "bg-yellow-100 text-yellow-700"

      : "bg-red-100 text-red-700";

  return (

    <span

      className={`rounded-full px-3 py-1 text-xs font-medium ${style}`}

    >

      {status}

    </span>

  );

}