type Props = {
  quantity: number;
};

export default function ProductStatusBadge({
  quantity,
}: Props) {

  if (quantity <= 0) {
    return (
      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
        Out of Stock
      </span>
    );
  }

  if (quantity < 10) {
    return (
      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
        Low Stock
      </span>
    );
  }

  return (
    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
      In Stock
    </span>
  );
}