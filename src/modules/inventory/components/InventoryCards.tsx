import InventoryStatCard from "./InventoryStatCard";
import LowStockCard from "./LowStockCard";
import OutOfStockCard from "./OutOfStockCard";

export default function InventoryCards() {

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      <InventoryStatCard

        title="Products"

        value="1254"

      />

      <InventoryStatCard

        title="Inventory Value"

        value="₦58.4M"

      />

      <LowStockCard />

      <OutOfStockCard />

    </div>

  );

}