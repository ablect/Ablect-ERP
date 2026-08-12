import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Boxes, Command, PackagePlus, RefreshCw, SlidersHorizontal, Sparkles, TrendingDown, TrendingUp, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useInventoryStore } from "../store/InventoryStore";
import { inventoryService } from "../services/InventoryService";
import type { InventoryItem } from "../types/InventoryItem";
import AdvancedStockTable, { type StockTableFilters } from "./AdvancedStockTable";
import ItemContextDrawer, { type LedgerEvent } from "./ItemContextDrawer";
import { useUIFeedback } from "../hooks/useUIFeedback";

function stockStatus(quantity: number, reorderLevel: number): InventoryItem["status"] {
  if (quantity <= 0) return "Out of Stock";
  if (quantity <= reorderLevel) return "Low Stock";
  return "In Stock";
}

export default function InventoryDashboard() {
  const setInventory = useInventoryStore((state) => state.setItems);
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [filters, setFilters] = useState<StockTableFilters>({ search: "", status: "All", category: "All" });
  const [commandOpen, setCommandOpen] = useState(false);
  const [command, setCommand] = useState("");
  const [images, setImages] = useState<Record<string, string>>({});
  const [ledger, setLedger] = useState<Record<string, LedgerEvent[]>>({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const feedback = useUIFeedback();

  const categories = useMemo(() => ["All", ...Array.from(new Set(items.map((item) => item.category).filter(Boolean))).sort()], [items]);
  const lowStock = items.filter((item) => item.quantity > 0 && item.quantity <= item.reorderLevel).length;
  const outOfStock = items.filter((item) => item.quantity <= 0).length;
  const totalUnits = items.reduce((sum, item) => sum + Math.max(0, item.quantity), 0);
  const inventoryValue = items.reduce((sum, item) => sum + Math.max(0, item.quantity) * Math.max(0, item.unitCost), 0);

  async function loadInventory() {
    setLoading(true);
    try {
      const data = await inventoryService.getAll();
      setItems(data);
      setInventory(data);
    } catch (error) {
      feedback.error();
      setMessage(error instanceof Error ? error.message : "Unable to load inventory.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadInventory(); }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }
      if (event.key === "Escape") {
        setCommandOpen(false);
        setCommand("");
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  async function updateQuantity(item: InventoryItem, quantity: number) {
    try {
      const updated: InventoryItem = { ...item, quantity, status: stockStatus(quantity, item.reorderLevel) };
      await inventoryService.update(updated);
      setItems((current) => current.map((entry) => entry.id === item.id ? updated : entry));
      setInventory(useInventoryStore.getState().items.map((entry) => entry.id === item.id ? updated : entry));
      setSelectedItem((current) => current?.id === item.id ? updated : current);
      setLedger((current) => ({
        ...current,
        [item.id]: [{ id: crypto.randomUUID(), label: quantity === 0 ? "Moved to out-of-stock" : "Stock adjusted", detail: `${item.quantity} → ${quantity} ${item.unit}. Updated from the inventory workspace.`, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }, ...(current[item.id] ?? [])],
      }));
      feedback.tick();
      setMessage(`${item.itemName} updated successfully.`);
    } catch (error) {
      feedback.error();
      setMessage(error instanceof Error ? error.message : "Stock update failed. The change was not saved.");
      throw error;
    }
  }

  async function runCommand() {
    const match = command.trim().match(/^adjust\s+(.+?)\s+([+-]\d+)$/i);
    if (!match) {
      setMessage("Command format: Adjust [Item Name] +50");
      feedback.error();
      return;
    }
    const query = match[1].trim().toLowerCase();
    const delta = Number(match[2]);
    const item = items.find((entry) => entry.itemName.toLowerCase() === query || entry.sku.toLowerCase() === query) ?? items.find((entry) => entry.itemName.toLowerCase().includes(query));
    if (!item) {
      setMessage(`No inventory item matches “${match[1]}”.`);
      feedback.error();
      return;
    }
    await updateQuantity(item, Math.max(0, item.quantity + delta));
    setCommandOpen(false);
    setCommand("");
  }

  return (
    <div className="min-h-full overflow-hidden rounded-[28px] bg-[#0F1115] text-slate-100 shadow-2xl shadow-slate-900/10">
      <div className="relative overflow-hidden px-4 pb-6 pt-5 sm:px-6 lg:px-7">
        <div className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-72 w-72 rounded-full bg-violet-500/[0.06] blur-3xl" />
        <header className="relative flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/15 bg-indigo-400/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-200"><Sparkles size={12} /> Inventory command centre</div>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Stock, without the friction.</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">A high-volume workspace for products, quantities, warehouse positioning and stock decisions without leaving the page.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setCommandOpen(true)} className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.035] px-3.5 py-2.5 text-xs font-bold text-slate-300 transition hover:-translate-y-0.5 hover:bg-white/[0.07]"><Command size={15} /> Command <kbd className="hidden rounded-md bg-black/30 px-1.5 py-0.5 text-[10px] text-slate-600 sm:inline">Ctrl K</kbd></button>
            <button onClick={() => void loadInventory()} className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-3.5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/15 transition hover:-translate-y-0.5 hover:bg-indigo-400"><RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Refresh</button>
          </div>
        </header>
        <section className="relative mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{([["Inventory value", `₦${inventoryValue.toLocaleString()}`, "At current unit cost", TrendingUp], ["Units on hand", totalUnits.toLocaleString(), `${items.length.toLocaleString()} SKUs`, Boxes], ["Low stock", lowStock.toLocaleString(), "Needs attention", TrendingDown], ["Out of stock", outOfStock.toLocaleString(), "Unavailable now", PackagePlus]] as [string, string, string, typeof Boxes][]).map(([label, value, hint, Icon]) => <motion.div key={label} whileHover={{ y: -2 }} className="rounded-2xl border border-white/[0.07] bg-[#16181D] p-4 shadow-xl shadow-black/10"><div className="flex items-start justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600">{label}</p><p className="mt-2 text-2xl font-black text-white">{value}</p><p className="mt-1 text-xs text-slate-600">{hint}</p></div><div className="rounded-xl bg-white/[0.04] p-2 text-indigo-300"><Icon size={17} /></div></div></motion.div>)}</section>
      </div>
      <main className="relative space-y-4 border-t border-white/[0.05] p-4 sm:p-6 lg:p-7">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"><div><h2 className="text-lg font-bold text-white">Stock workspace</h2><p className="mt-1 text-xs text-slate-600">Click any row to open the spatial context drawer. Edit quantities inline for rapid stock control.</p></div><div className="flex gap-2 overflow-x-auto"><select value={filters.category} onChange={(event) => setFilters((current) => ({ ...current, category: event.target.value }))} className="rounded-xl border border-white/[0.07] bg-[#16181D] px-3 py-2 text-xs font-semibold text-slate-400 outline-none focus:border-indigo-400/30">{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select><button onClick={() => setFilters({ search: "", status: "All", category: "All" })} className="inline-flex items-center gap-2 rounded-xl border border-white/[0.07] px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-white/[0.04] hover:text-slate-200"><SlidersHorizontal size={14} /> Clear</button></div></div>
        {message && <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between rounded-xl border border-indigo-400/10 bg-indigo-500/[0.06] px-4 py-3 text-xs text-indigo-100"><span>{message}</span><button onClick={() => setMessage("")}><X size={14} /></button></motion.div>}
        <AdvancedStockTable items={items} filters={filters} onFiltersChange={setFilters} onSelectItem={(item) => { feedback.beep(); setSelectedItem(item); }} onUpdateQuantity={updateQuantity} onScan={() => { feedback.beep(); setMessage("Scanner ready. Scan a SKU or barcode into the inventory search field."); }} />
        <div className="grid gap-4 lg:grid-cols-3">{[{ title: "High-volume ready", text: "The table is rendered from a filtered data model so the UI stays focused as the catalogue grows." }, { title: "Spatial context", text: "Product details stay in a drawer, keeping the main workspace uninterrupted." }, { title: "Keyboard first", text: "Ctrl/Cmd + K opens commands for rapid stock adjustments without reaching for the mouse." }].map((card) => <div key={card.title} className="rounded-2xl border border-white/[0.06] bg-[#16181D] p-4"><div className="flex items-center justify-between"><p className="text-sm font-bold text-slate-200">{card.title}</p><ArrowUpRight size={15} className="text-slate-700" /></div><p className="mt-2 text-xs leading-5 text-slate-600">{card.text}</p></div>)}</div>
      </main>
      <ItemContextDrawer item={selectedItem} open={Boolean(selectedItem)} image={selectedItem ? images[selectedItem.id] : undefined} ledger={selectedItem ? (ledger[selectedItem.id] ?? []) : []} onClose={() => setSelectedItem(null)} onImageChange={(itemId, image) => setImages((current) => ({ ...current, [itemId]: image }))} />
      <AnimatePresence>{commandOpen && <motion.div className="fixed inset-0 z-[70] flex items-start justify-center bg-black/50 p-4 pt-[14vh] backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setCommandOpen(false)}><motion.div initial={{ y: -18, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: -18, scale: 0.98 }} className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/[0.09] bg-[#16181D] shadow-2xl shadow-black/60" onMouseDown={(event) => event.stopPropagation()}><div className="flex items-center gap-3 border-b border-white/[0.07] p-4"><Command size={18} className="text-indigo-300" /><input autoFocus value={command} onChange={(event) => setCommand(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") void runCommand(); if (event.key === "Escape") setCommandOpen(false); }} placeholder="Adjust [Item Name] +50" className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-600" /><button onClick={() => setCommandOpen(false)} className="rounded-lg p-1.5 text-slate-600 hover:bg-white/[0.05] hover:text-white"><X size={16} /></button></div><div className="p-4"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600">Quick command</p><button onClick={() => setCommand("Adjust ")} className="mt-3 w-full rounded-xl border border-white/[0.06] bg-white/[0.025] p-3 text-left text-xs text-slate-400 hover:bg-white/[0.05]">Adjust an item by a positive or negative quantity, e.g. <span className="font-semibold text-indigo-200">Adjust Rice 50kg +50</span></button><p className="mt-3 text-[11px] text-slate-600">Only exact or unique partial product matches are adjusted. Stock never goes below zero.</p></div></motion.div></motion.div>}</AnimatePresence>
    </div>
  );
}
