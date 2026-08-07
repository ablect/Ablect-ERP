import StatCard from "../../../components/ui/StatCard";

export default function KPIGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      <StatCard
        title="Products"
        value="1,245"
      />

      <StatCard
        title="Inventory Value"
        value="₦58,420,000"
      />

      <StatCard
        title="Today's Sales"
        value="₦1,285,000"
      />

      <StatCard
        title="Customers"
        value="462"
      />

    </div>
  );
}