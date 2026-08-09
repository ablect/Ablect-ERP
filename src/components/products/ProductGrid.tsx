import { motion } from "framer-motion";
import { Check, PackageOpen } from "lucide-react";
import type { InventoryItem } from "../../modules/inventory/types/InventoryItem";

function money(value: number) {
  return `₦${Math.max(0, value).toLocaleString()}`;
}

function statusClass(status: InventoryItem["status"]) {
  if (status === "In Stock") return "bg-emerald-50 text-emerald-700 ring-emerald-100";
  if (status === "Low Stock") return "bg-amber-50 text-amber-700 ring-amber-100";
  return "bg-rose-50 text-rose-700 ring-rose-100";
}

type Props = {
  products: InventoryItem[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onOpen: (product: InventoryItem) => void;
};

export default function ProductGrid({ products, selectedIds, onToggleSelect, onOpen }: Props) {
  if (!products.length) {
    return <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center"><PackageOpen className="mx-auto text-slate-300" size={44} /><h2 className="mt-4 text-lg font-black text-slate-800">No products found</h2><p className="mt-1 text-sm text-slate-500">Try a different search or add a new product.</p></div>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {products.map((product) => {
        const selected = selectedIds.includes(product.id);
        return (
          <motion.article key={product.id} layout whileHover={{ y: -4 }} transition={{ duration: 0.18 }} className={`group overflow-hidden rounded-3xl border bg-white shadow-sm transition ${selected ? "border-indigo-300 ring-4 ring-indigo-50" : "border-slate-200 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/40"}`}>
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-sky-50">
              {product.imageUrl ? <img src={product.imageUrl} alt={product.itemName} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center text-indigo-200"><PackageOpen size={56} /></div>}
              <button onClick={() => onToggleSelect(product.id)} className={`absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-xl border shadow-sm backdrop-blur ${selected ? "border-indigo-600 bg-indigo-600 text-white" : "border-white/80 bg-white/90 text-transparent hover:text-slate-400"}`} aria-label="Select product">{selected && <Check size={16} />}</button>
              <span className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${statusClass(product.status)}`}>{product.status}</span>
            </div>
            <button onClick={() => onOpen(product)} className="w-full p-5 text-left">
              <div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate text-base font-black text-slate-900">{product.itemName}</p><p className="mt-1 truncate text-xs font-semibold text-slate-400">{product.brand || "No brand"} · {product.sku}</p></div><span className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500">{product.category}</span></div>
              <div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-slate-50 p-3"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Selling</p><p className="mt-1 font-black text-slate-900">{money(product.sellingPrice)}</p></div><div className="rounded-2xl bg-slate-50 p-3"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Stock</p><p className="mt-1 font-black text-slate-900">{product.quantity.toLocaleString()} {product.unit}</p></div></div>
            </button>
          </motion.article>
        );
      })}
    </div>
  );
}
