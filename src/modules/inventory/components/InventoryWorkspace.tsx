import InventoryToolbar from "./InventoryToolbar";
import ProductFilters from "./ProductFilters";
import ProductTable from "./ProductTable";

export default function InventoryWorkspace() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 p-6">
        <InventoryToolbar />
      </div>

      <div className="p-6">

        <div className="mb-6">
          <ProductFilters />
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200">
          <ProductTable />
        </div>

      </div>

    </section>
  );
}