import { useInventoryStore } from "../../inventory/store/InventoryStore";

type Props = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export default function SaleProductSelect({
  value,
  onChange,
  disabled = false,
}: Props) {
  const { items } = useInventoryStore();

  const availableItems = items.filter(
    (item) => item.quantity > 0,
  );

  return (
    <select
      className="rounded-lg border p-3"
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      disabled={disabled}
    >
      <option value="">
        Select Product
      </option>

      {availableItems.map((item) => (
        <option
          key={item.id}
          value={item.id}
        >
          {item.itemName} ({item.sku}) - Stock:{" "}
          {item.quantity}
        </option>
      ))}
    </select>
  );
}