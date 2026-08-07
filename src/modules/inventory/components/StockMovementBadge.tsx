type Props = {

  type:

    | "Stock In"

    | "Stock Out"

    | "Adjustment";

};

export default function StockMovementBadge({

  type,

}: Props) {

  const color =

    type === "Stock In"

      ? "bg-green-100 text-green-700"

      : type === "Stock Out"

      ? "bg-red-100 text-red-700"

      : "bg-yellow-100 text-yellow-700";

  return (

    <span

      className={`rounded-full px-3 py-1 text-xs font-medium ${color}`}

    >

      {type}

    </span>

  );

}