import { Truck } from "lucide-react";

export default function Suppliers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Truck size={28} />
        <div>
          <h1 className="text-2xl font-bold">Suppliers</h1>
          <p className="text-gray-500">Manage vendors and procurement partners.</p>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-8 text-center text-gray-500">
        Supplier engine connected. Purchase integration comes in the next batches.
      </div>
    </div>
  );
}