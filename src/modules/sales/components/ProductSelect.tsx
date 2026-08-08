import {
  useEffect,
} from "react";

import {
  useInventoryStore,
} from "../../inventory/store/InventoryStore";

type Props = {
  value: string;
  onChange: (
    productId: string,
  ) => void;
  disabled?: boolean;
};

export default function ProductSelect({
  value,
  onChange,
  disabled = false,
}: Props) {
  const items =
    useInventoryStore(
      (state) =>
        state.items,
    );

  useEffect(() => {
    if (
      value &&
      !items.some(
        (item) =>
          item.id === value,
      )
    ) {
      onChange("");
    }
  }, [
    value,
    items,
    onChange,
  ]);

  return (
    <select
      className="rounded-lg border p-3"
      value={value}
      onChange={(e) =>
        onChange(
          e.target.value,
        )
      }
      disabled={disabled}
    >
      <option value="">
        Select Product
      </option>

      {items.map((item) => (
        <option
          key={item.id}
          value={item.id}
          disabled={
            item.quantity <= 0
          }
        >
          {item.itemName} - {item.sku} - Stock:{" "}
          {item.quantity}
        </option>
      ))}
    </select>
  );
}