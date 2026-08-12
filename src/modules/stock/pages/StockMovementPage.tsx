import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, ArrowDownToLine, ArrowUpFromLine, Filter, Search } from "lucide-react";
import PageContainer from "../../../components/ui/PageContainer";
import { useInventoryStore } from "../../inventory/store/InventoryStore";
import { useSupplyChainStore } from "../../supplyChain/store/useSupplyChainStore";

export default function StockMovementPage() {
  const hydrate = useSupplyChainStore((state) => state.hydrate);
  const movements = useSupplyChainStore((state) => state.movements);
  const warehouses = useSupplyChainStore((state) => state.warehouses);
  const products = useInventoryStore((state) => state.items);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");

  useEffect(() => { void hydrate(); }, [hydrate]);

  const filtered = useMemo(() => movements.filter((m) => {
    const product = products.find((p) => p.id === m.productId);
    const text = `${m.reference} ${product?.itemName ?? ""} ${product?.sku ?? ""}`.toLowerCase();
    return (!query.trim() || text.includes(query.toLowerCase())) && (type === "All" || m.type === type);
  }), [movements, products, query, type]);

  const incoming = movements.filter((m) => m.type === "In").reduce((s, m) => s + m.quantity, 0);
  const outgoing = movements.filter((m) => m.type === "Out").reduce((s, m) => s + m.quantity, 0);
  const transfers = movements.filter((m) => m.type === "Transfer").length;

  return <PageContainer><div className="min-h-full space-y-6 bg-[#f8fafc] pb-10 text-slate-900">
    <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><div className="text-xs font-black uppercase tracking-[0.2em] text-violet-500">Inventory Truth Layer</div><h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Stock Movement</h1><p className="mt-2 text-sm text-slate-500">A read-only operational ledger for receipts, issues, transfers and adjustments.</p></div><div className="rounded-2xl bg-violet-50 px-4 py-3 text-xs font-bold text-violet-700">{movements.length} ledger entries</div></div></header>
    <section className="grid gap-4 sm:grid-cols-3"><Stat icon={ArrowDownToLine} label="Incoming units" value={incoming} tone="emerald"/><Stat icon={ArrowUpFromLine} label="Outgoing units" value={outgoing} tone="rose"/><Stat icon={ArrowLeftRight} label="Transfers" value={transfers} tone="violet"/></section>
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm"><div className="flex flex-col gap-3 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between"><div className="relative w-full max-w-xl"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search reference, product or SKU..." className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-50"/></div><div className="flex items-center gap-2"><Filter size={16} className="text-slate-400"/><select value={type} onChange={(e) => setType(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold"><option>All</option><option>In</option><option>Out</option><option>Transfer</option><option>Adjustment</option></select></div></div><div className="overflow-x-auto"><table className="min-w-[1000px] w-full text-left"><thead className="bg-slate-50 text-[11px] font-black uppercase tracking-wider text-slate-400"><tr><th className="px-5 py-4">Date</th><th className="px-5 py-4">Reference</th><th className="px-5 py-4">Type</th><th className="px-5 py-4">Product</th><th className="px-5 py-4">Source</th><th className="px-5 py-4">Destination</th><th className="px-5 py-4 text-right">Quantity</th><th className="px-5 py-4">User</th></tr></thead><tbody className="divide-y divide-slate-100">{filtered.map((movement) => { const product = products.find((p) => p.id === movement.productId); const source = warehouses.find((w) => w.id === movement.sourceWarehouseId)?.name ?? "—"; const destination = warehouses.find((w) => w.id === movement.destinationWarehouseId)?.name ?? "—"; const tone = movement.type === "In" ? "bg-emerald-50 text-emerald-700" : movement.type === "Out" ? "bg-rose-50 text-rose-700" : movement.type === "Transfer" ? "bg-violet-50 text-violet-700" : "bg-amber-50 text-amber-700"; return <motion.tr key={movement.id} layout whileHover={{ backgroundColor: "#faf5ff" }}><td className="px-5 py-4 text-sm text-slate-500">{new Date(movement.date).toLocaleString()}</td><td className="px-5 py-4 font-black text-slate-900">{movement.reference}</td><td className="px-5 py-4"><span className={`rounded-full px-3 py-1.5 text-xs font-black ${tone}`}>{movement.type}</span></td><td className="px-5 py-4"><p className="font-bold text-slate-800">{product?.itemName ?? movement.productId}</p><p className="text-xs text-slate-400">{product?.sku ?? ""}</p></td><td className="px-5 py-4 text-sm text-slate-500">{source}</td><td className="px-5 py-4 text-sm text-slate-500">{destination}</td><td className="px-5 py-4 text-right font-black">{movement.quantity.toLocaleString()}</td><td className="px-5 py-4 text-sm font-semibold text-slate-600">{movement.user}</td></motion.tr>; })}</tbody></table></div>{!filtered.length && <div className="p-12 text-center"><ArrowLeftRight className="mx-auto text-slate-200" size={44}/><p className="mt-3 font-black text-slate-600">No movements match this filter</p><p className="mt-1 text-sm text-slate-400">Receiving a purchase order will create incoming ledger entries here.</p></div>}</section>
  </div></PageContainer>;
}

function Stat({ icon: Icon, label, value, tone }: { icon: typeof ArrowDownToLine; label: string; value: number; tone: "emerald" | "rose" | "violet" }) { const cls = tone === "emerald" ? "bg-emerald-50 text-emerald-600" : tone === "rose" ? "bg-rose-50 text-rose-600" : "bg-violet-50 text-violet-600"; return <motion.div whileHover={{ y: -3 }} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${cls}`}><Icon size={19}/></div><p className="mt-4 text-xs font-black uppercase tracking-wider text-slate-400">{label}</p><p className="mt-2 text-2xl font-black text-slate-950">{value.toLocaleString()}</p></motion.div>; }
