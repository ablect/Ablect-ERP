import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Boxes, MapPin, Package, Plus, Search, Warehouse as WarehouseIcon } from "lucide-react";
import PageContainer from "../../../components/ui/PageContainer";
import { useInventoryStore } from "../../inventory/store/InventoryStore";
import { useSupplyChainStore } from "../../supplyChain/store/useSupplyChainStore";
import type { Warehouse } from "../types/Warehouse";

export default function WarehousePage() {
  const hydrate = useSupplyChainStore((state) => state.hydrate);
  const warehouses = useSupplyChainStore((state) => state.warehouses);
  const addWarehouse = useSupplyChainStore((state) => state.addWarehouse);
  const products = useInventoryStore((state) => state.items);
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => { void hydrate(); }, [hydrate]);

  const filtered = useMemo(() => warehouses.filter((w) => !query.trim() || `${w.name} ${w.code} ${w.location}`.toLowerCase().includes(query.toLowerCase())), [query, warehouses]);
  const totalCapacity = warehouses.reduce((sum, w) => sum + w.capacity, 0);
  const totalStock = warehouses.reduce((sum, w) => sum + w.currentStock, 0);

  async function create() {
    if (!name.trim() || !location.trim()) return;
    const warehouse: Warehouse = { id: crypto.randomUUID(), code: name.trim().slice(0, 3).toUpperCase(), name: name.trim(), location: location.trim(), manager: "Warehouse Team", capacity: 5000, currentStock: 0, status: "Active" };
    await addWarehouse(warehouse);
    setName(""); setLocation(""); setShowForm(false);
  }

  return <PageContainer><div className="min-h-full space-y-6 bg-[#f8fafc] pb-10 text-slate-900">
    <header className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between"><div><div className="text-xs font-black uppercase tracking-[0.2em] text-sky-500">Storage Network</div><h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Warehouse</h1><p className="mt-2 text-sm text-slate-500">See capacity, locations and stock distribution without leaving the ERP workspace.</p></div><button onClick={() => setShowForm(true)} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-sky-200 transition hover:-translate-y-0.5 hover:bg-sky-700"><Plus size={18}/> Add warehouse</button></header>
    <section className="grid gap-4 sm:grid-cols-3"><Metric icon={WarehouseIcon} label="Locations" value={warehouses.length}/><Metric icon={Boxes} label="Total capacity" value={totalCapacity}/><Metric icon={Package} label="Units recorded" value={totalStock}/></section>
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"><div className="relative max-w-xl"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search warehouse, code or location..." className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-50"/></div></div>
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{filtered.map((warehouse) => { const ratio = warehouse.capacity ? Math.min(100, Math.round((warehouse.currentStock / warehouse.capacity) * 100)) : 0; const localProducts = products.filter((p) => p.warehouse === warehouse.name); return <motion.article key={warehouse.id} layout whileHover={{ y: -4 }} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-xl hover:shadow-sky-100"><div className="flex items-start justify-between"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600"><WarehouseIcon size={22}/></div><span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">{warehouse.status}</span></div><h2 className="mt-5 text-xl font-black text-slate-950">{warehouse.name}</h2><p className="mt-1 flex items-center gap-1 text-sm text-slate-500"><MapPin size={15}/>{warehouse.location}</p><div className="mt-6"><div className="flex justify-between text-xs font-bold text-slate-500"><span>Capacity</span><span>{ratio}%</span></div><div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100"><motion.div initial={{ width: 0 }} animate={{ width: `${ratio}%` }} className={`h-full rounded-full ${ratio > 85 ? "bg-rose-400" : ratio > 65 ? "bg-amber-400" : "bg-sky-500"}`}/></div><p className="mt-2 text-xs text-slate-400">{warehouse.currentStock.toLocaleString()} / {warehouse.capacity.toLocaleString()} units</p></div><div className="mt-5 border-t border-slate-100 pt-4"><p className="text-xs font-black uppercase tracking-wider text-slate-400">Products in catalog</p><div className="mt-3 flex flex-wrap gap-2">{localProducts.slice(0, 5).map((p) => <span key={p.id} className="rounded-xl bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">{p.itemName}</span>)}{!localProducts.length && <span className="text-xs text-slate-400">No products assigned to this location yet.</span>}</div></div></motion.article>; })}</section>
    {showForm && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-sm"><div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl"><div className="flex items-center justify-between"><h2 className="text-2xl font-black">New warehouse</h2><button onClick={() => setShowForm(false)} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100">×</button></div><div className="mt-6 space-y-4"><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Warehouse name" className="w-full rounded-xl border border-slate-200 p-3"/><input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Physical location" className="w-full rounded-xl border border-slate-200 p-3"/></div><div className="mt-6 flex justify-end gap-3"><button onClick={() => setShowForm(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold">Cancel</button><button onClick={() => void create()} className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-black text-white">Create</button></div></div></div>}
  </div></PageContainer>;
}

function Metric({ icon: Icon, label, value }: { icon: typeof WarehouseIcon; label: string; value: number }) { return <motion.div whileHover={{ y: -3 }} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-50 text-sky-600"><Icon size={19}/></div><p className="mt-4 text-xs font-black uppercase tracking-wider text-slate-400">{label}</p><p className="mt-2 text-2xl font-black text-slate-950">{value.toLocaleString()}</p></motion.div>; }
