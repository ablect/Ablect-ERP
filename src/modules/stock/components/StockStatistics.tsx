import StatCard from "../../../components/ui/StatCard";

export default function StockStatistics() {

  return (

    <div className="grid gap-4 md:grid-cols-3">

      <StatCard
        title="Movements"
        value="0"
      />

      <StatCard
        title="Stock In"
        value="0"
      />

      <StatCard
        title="Stock Out"
        value="0"
      />

    </div>

  );

}