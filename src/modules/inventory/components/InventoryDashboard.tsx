import InventoryHero from "./InventoryHero";
import InventoryCards from "./InventoryCards";
import DashboardWidgets from "./DashboardWidgets";
import InventoryWorkspace from "./InventoryWorkspace";
import RecentProducts from "./RecentProducts";
import ProductCountCard from "./ProductCountCard";

export default function InventoryDashboard() {
  return (
    <main className="flex flex-col gap-8">

      <InventoryHero />

      <InventoryCards />

      <DashboardWidgets />

      <InventoryWorkspace />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2">
          <RecentProducts />
        </div>

        <ProductCountCard />

      </div>

    </main>
  );
}