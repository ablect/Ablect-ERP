import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronRight, ClipboardList, PackageCheck, Plus, Search, Truck, X } from "lucide-react";
import PageContainer from "../../../components/ui/PageContainer";
import { useInventoryStore } from "../../inventory/store/InventoryStore";
import { useSupplyChainStore } from "../../supplyChain/store/useSupplyChainStore";

const money = (value: number) => `₦${value.toLocaleString()}`;

export default function PurchasePage() {
  const hydrate = useSupplyChainStore((state) => state.hydrate);
  const suppliers = useSupplyChainStore((state) => state.suppliers);
  const warehouses = useSupplyChainStore((state) => state.warehouses);
  const purchases = useSupplyChainStore((state) => state.purchases);
  const createPurchase = useSupplyChainStore((state) => state.createPurchase);
  const receivePurchaseOrder = useSupplyChainStore((state) => state.receivePurchaseOrder);
  const products = useInventoryStore((state) => state.items);
  const [query, setQuery] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [supplierId, setSupplierId] = useState("");
  const [warehouseId, setWarehouseId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unitCost, setUnitCost] = useState(0);

  useEffect(() => { void hydrate(); }, [hydrate]);

  const filtered = useMemo(() => {
    const needle = query.toLowerCase().trim();
    return purchases.filter((purchase) => {
      const supplier = suppliers.find((item) => item.id === purchase.supplierId)?.name ?? "";
      return !needle || purchase.number.toLowerCase().includes(needle) || supplier.toLowerCase().includes(needle);
    });
  }, [purchases, query, suppliers]);

  const selected = purchases.find((item) => item.id === selectedId) ?? null;
  const pending = purchases.filter((item) => item.status === "Pending" || item.status === "Partially Received").length;
  const received = purchases.filter((item) => item.status === "Received").length;
  const value = purchases.reduce((sum, item) => sum + item.totalAmount, 0);

  async function submit() {
    if (!supplierId || !warehouseId || !productId || quantity <= 0) return;
    await createPurchase({ supplierId, warehouseId, orderDate: new Date().toISOString(), expectedDate: new Date(Date.now() + 86400000 * 3).toISOString(), notes: "Created from procurement workspace", lines: [{ id: crypto.randomUUID(), productId, quantity, receivedQuantity: 0, unitCost }] });
    setShowCreate(false);
    setSupplierId(""); setWarehouseId(""); setProductId(""); setQuantity(1); setUnitCost(0);
  }

  return <PageContainer>
    <div className="min-h-full space-y-6 bg-[#f8fafc] pb-10 text-slate-900">
      <header className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
        <div><div className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500">Procurement Hub</div><h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Purchases</h1><p className="mt-2 text-sm text-slate-500">Purchase orders connect suppliers, products, warehouses and the stock ledger.</p></div>
        <button onClick={() => setShowCreate(true)} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"><Plus size={18}/> New purchase order</button>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[["Open POs", pending, ClipboardList, "indigo"],["Received", received, PackageCheck, "emerald"],["Suppliers", suppliers.length, Truck, "sky"],["Committed value", money(value), ChevronRight, "amber"]].map(([label, val, Icon, tone]) => <motion.div key={String(label)} whileHover={{ y: -3 }} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-2xl ${tone === "indigo" ? "bg-indigo-50 text-indigo-600" : tone === "emerald" ? "bg-emerald-50 text-emerald-600" : tone === "sky" ? "bg-sky-50 text-sky-600" : "bg-amber-50 text-amber-600"}`}><Icon size={19}/></div><p className="text-xs font-black uppercase tracking-wider text-slate-400">{label}</p><p className="mt-2 text-2xl font-black text-slate-950">{val}</p></motion.div>)}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between"><div className="relative w-full max-w-xl"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search PO number or supplier..." className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"/></div><span className="text-xs font-bold text-slate-400">{filtered.length} orders</span></div>
          <div className="overflow-x-auto"><table className="min-w-[850px] w-full text-left"><thead className="bg-slate-50 text-[11px] font-black uppercase tracking-wider text-slate-400"><tr><th className="px-5 py-4">Purchase order</th><th className="px-5 py-4">Supplier</th><th className="px-5 py-4">Destination</th><th className="px-5 py-4">Status</th><th className="px-5 py-4 text-right">Value</th><th/></tr></thead><tbody className="divide-y divide-slate-100">{filtered.map((purchase) => { const supplier = suppliers.find((item) => item.id === purchase.supplierId); const warehouse = warehouses.find((item) => item.id === purchase.warehouseId); const statusTone = purchase.status === "Received" ? "bg-emerald-50 text-emerald-700" : purchase.status === "Pending" || purchase.status === "Partially Received" ? "bg-amber-50 text-amber-700" : "bg-sky-50 text-sky-700"; return <motion.tr key={purchase.id} layout whileHover={{ backgroundColor: "#f8fafc" }} onClick={() => setSelectedId(purchase.id)} className="cursor-pointer transition"><td className="px-5 py-4"><p className="font-black text-slate-900">{purchase.number}</p><p className="text-xs text-slate-400">{new Date(purchase.orderDate).toLocaleDateString()}</p></td><td className="px-5 py-4 font-semibold text-slate-700">{supplier?.name ?? "Unknown supplier"}</td><td className="px-5 py-4 text-sm text-slate-600">{warehouse?.name ?? "Unassigned"}</td><td className="px-5 py-4"><span className={`rounded-full px-3 py-1.5 text-xs font-black ${statusTone}`}>{purchase.status}</span></td><td className="px-5 py-4 text-right font-black">{money(purchase.totalAmount)}</td><td className="px-5 py-4 text-right"><ChevronRight size={18} className="text-slate-300"/></td></motion.tr>; })}</tbody></table></div>
        </div>

        <AnimatePresence mode="wait"><motion.aside key={selected?.id ?? "empty"} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">{selected ? <><div className="flex items-start justify-between"><div><p className="text-xs font-black uppercase tracking-wider text-indigo-500">Purchase detail</p><h2 className="mt-1 text-xl font-black">{selected.number}</h2></div><button onClick={() => setSelectedId(null)} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"><X size={18}/></button></div><div className="mt-5 space-y-4"><div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-bold text-slate-400">Supplier</p><p className="mt-1 font-black">{suppliers.find((s) => s.id === selected.supplierId)?.name}</p></div><div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-bold text-slate-400">Destination warehouse</p><p className="mt-1 font-black">{warehouses.find((w) => w.id === selected.warehouseId)?.name}</p></div><div className="space-y-2">{selected.lines.length ? selected.lines.map((line) => <div key={line.id} className="flex items-center justify-between rounded-2xl border border-slate-100 p-3"><div><p className="font-bold">{products.find((p) => p.id === line.productId)?.itemName ?? line.productId}</p><p className="text-xs text-slate-400">{line.receivedQuantity}/{line.quantity} received</p></div><span className="font-black">{money(line.quantity * line.unitCost)}</span></div>) : <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">No line items were attached to this imported PO.</p>}</div>{selected.status !== "Received" && selected.lines.length > 0 && <button onClick={() => void receivePurchaseOrder(selected.id)} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-700"><Check size={18}/> Receive stock</button>}</div></> : <div className="flex min-h-[360px] flex-col items-center justify-center text-center"><PackageCheck className="text-slate-200" size={48}/><p className="mt-4 font-black text-slate-700">Select a purchase order</p><p className="mt-1 text-sm text-slate-400">Its supplier, destination and receiving workflow will appear here.</p></div>}</motion.aside></AnimatePresence>
      </section>

      <AnimatePresence>{showCreate && <motion.div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div initial={{ y: 24, scale: .98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 24, scale: .98 }} className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl"><div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-wider text-indigo-500">Create</p><h2 className="text-2xl font-black">New purchase order</h2></div><button onClick={() => setShowCreate(false)} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"><X/></button></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="space-y-2 text-sm font-bold text-slate-600">Supplier<select value={supplierId} onChange={(e) => setSupplierId(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 outline-none focus:border-indigo-300"><option value="">Select supplier</option>{suppliers.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label><label className="space-y-2 text-sm font-bold text-slate-600">Destination<select value={warehouseId} onChange={(e) => setWarehouseId(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 outline-none focus:border-indigo-300"><option value="">Select warehouse</option>{warehouses.map((w) => <option key={w.id} value={w.id}>{w.name}</option>)}</select></label><label className="space-y-2 text-sm font-bold text-slate-600 sm:col-span-2">Product<select value={productId} onChange={(e) => { setProductId(e.target.value); const p = products.find((x) => x.id === e.target.value); setUnitCost(p?.unitCost ?? 0); }} className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 outline-none focus:border-indigo-300"><option value="">Select product</option>{products.map((p) => <option key={p.id} value={p.id}>{p.itemName} · {p.sku}</option>)}</select></label><label className="space-y-2 text-sm font-bold text-slate-600">Quantity<input type="number" min={1} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-slate-200 p-3"/></label><label className="space-y-2 text-sm font-bold text-slate-600">Unit cost<input type="number" min={0} value={unitCost} onChange={(e) => setUnitCost(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-slate-200 p-3"/></label></div><div className="mt-6 flex justify-end gap-3"><button onClick={() => setShowCreate(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold">Cancel</button><button onClick={() => void submit()} disabled={!supplierId || !warehouseId || !productId} className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-40">Create PO</button></div></motion.div></motion.div>}</AnimatePresence>
    </div>
  </PageContainer>;
}
