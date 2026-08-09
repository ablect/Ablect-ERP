import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Boxes, CheckCircle2, Command, Grid2X2, List, Plus, Search, SlidersHorizontal, Sparkles, Tag, Trash2, Upload } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { inventoryService } from "../../modules/inventory/services/InventoryService";
import { useInventoryStore } from "../../modules/inventory/store/InventoryStore";
import type { InventoryItem } from "../../modules/inventory/types/InventoryItem";
import ProductGrid from "./ProductGrid";
import ProductTable from "./ProductTable";
import ProductDrawer from "./ProductDrawer";
import useProductFeedback from "./useProductFeedback";

type ViewMode = "grid" | "table";
type Tone = "indigo" | "emerald" | "sky" | "amber";
type Stat = { label: string; value: string; hint: string; Icon: LucideIcon; tone: Tone };

function statusFor(quantity: number, reorderLevel: number): InventoryItem["status"] {
  if (quantity <= 0) return "Out of Stock";
  if (quantity <= reorderLevel) return "Low Stock";
  return "In Stock";
}

function money(value: number) {
  return `₦${Math.max(0, value).toLocaleString()}`;
}

function makeProduct(): InventoryItem {
  return {
    id: crypto.randomUUID(),
    sku: `SKU-${Date.now().toString().slice(-6)}`,
    barcode: "",
    itemName: "New Product",
    category: "General",
    warehouse: "Main Warehouse",
    unit: "PCS",
    quantity: 0,
    reorderLevel: 5,
    unitCost: 0,
    sellingPrice: 0,
    status: "Out of Stock",
    brand: "",
    description: "",
    imageUrl: "",
  };
}

const toneClasses: Record<Tone, string> = {
  indigo: "bg-indigo-50 text-indigo-600",
  emerald: "bg-emerald-50 text-emerald-600",
  sky: "bg-sky-50 text-sky-600",
  amber: "bg-amber-50 text-amber-600",
};

export default function ProductDashboard() {
  const setInventory = useInventoryStore((state) => state.setItems);
  const { click, success, error } = useProductFeedback();
  const [products, setProducts] = useState<InventoryItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [view, setView] = useState<ViewMode>("grid");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [showCommand, setShowCommand] = useState(false);
  const [command, setCommand] = useState("");
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const items = await inventoryService.getAll();
      setProducts(items);
      setInventory(items);
    } finally {
      setLoading(false);
    }
  }, [setInventory]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setShowCommand(true);
        click();
      }
      if (event.key === "Escape") setShowCommand(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [click]);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((item) => item.category).filter(Boolean)))],
    [products],
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return products.filter((product) => {
      const textMatch = !needle || [product.itemName, product.sku, product.barcode, product.brand]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(needle));
      return textMatch && (category === "All" || product.category === category) && (status === "All" || product.status === status);
    });
  }, [category, products, query, status]);

  const selectedProducts = products.filter((product) => selectedIds.includes(product.id));
  const stockValue = products.reduce((sum, product) => sum + product.quantity * product.unitCost, 0);
  const retailValue = products.reduce((sum, product) => sum + product.quantity * product.sellingPrice, 0);
  const lowStock = products.filter((product) => product.status === "Low Stock").length;
  const outOfStock = products.filter((product) => product.status === "Out of Stock").length;

  const stats: Stat[] = [
    { label: "Products", value: products.length.toLocaleString(), hint: "Master catalog", Icon: Boxes, tone: "indigo" },
    { label: "Stock cost", value: money(stockValue), hint: "Current inventory cost", Icon: BarChart3, tone: "emerald" },
    { label: "Retail value", value: money(retailValue), hint: "Potential sales value", Icon: Tag, tone: "sky" },
    { label: "Attention", value: `${lowStock + outOfStock}`, hint: `${lowStock} low · ${outOfStock} out`, Icon: SlidersHorizontal, tone: "amber" },
  ];

  function show(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3200);
  }

  async function saveProduct(product: InventoryItem) {
    const quantity = Math.max(0, Number(product.quantity) || 0);
    const reorderLevel = Math.max(0, Number(product.reorderLevel) || 0);
    const normalized: InventoryItem = {
      ...product,
      quantity,
      reorderLevel,
      unitCost: Math.max(0, Number(product.unitCost) || 0),
      sellingPrice: Math.max(0, Number(product.sellingPrice) || 0),
      status: statusFor(quantity, reorderLevel),
    };
    const exists = products.some((item) => item.id === normalized.id);
    const next = exists ? await inventoryService.update(normalized) : await inventoryService.create(normalized);
    setProducts(next);
    setInventory(next);
    setSelectedId(normalized.id);
    success();
    show(`${normalized.itemName} saved.`);
  }

  async function addProduct() {
    await saveProduct(makeProduct());
  }

  async function deleteSelected() {
    if (!selectedIds.length) return;
    try {
      let next = products;
      for (const id of selectedIds) next = await inventoryService.delete(id);
      setProducts(next);
      setInventory(next);
      setSelectedIds([]);
      setSelectedId(null);
      success();
      show(`${selectedIds.length} product(s) removed.`);
    } catch {
      error();
    }
  }

  async function applyCategory(nextCategory: string) {
    if (!nextCategory || !selectedIds.length) return;
    let next = products;
    for (const item of selectedProducts) next = await inventoryService.update({ ...item, category: nextCategory });
    setProducts(next);
    setInventory(next);
    setSelectedIds([]);
    success();
    show("Category updated for selected products.");
  }

  async function applyDiscount(percent: number) {
    const factor = Math.max(0, Math.min(100, percent)) / 100;
    let next = products;
    for (const item of selectedProducts) next = await inventoryService.update({ ...item, sellingPrice: Math.round(item.sellingPrice * (1 - factor)) });
    setProducts(next);
    setInventory(next);
    setSelectedIds([]);
    success();
    show(`${percent}% discount applied.`);
  }

  function runCommand() {
    const match = command.match(/^adjust\s+(.+?)\s+([+-]\d+)$/i);
    if (!match) {
      show("Command example: Adjust Rice +50");
      return;
    }
    const [, name, amountText] = match;
    const amount = Number(amountText);
    const product = products.find((item) => item.itemName.toLowerCase().includes(name.toLowerCase()));
    if (!product) {
      error();
      show("Product not found.");
      return;
    }
    const quantity = Math.max(0, product.quantity + amount);
    void inventoryService.update({ ...product, quantity, status: statusFor(quantity, product.reorderLevel) }).then((next) => {
      setProducts(next);
      setInventory(next);
      success();
      setShowCommand(false);
      setCommand("");
      show(`${product.itemName} stock adjusted by ${amount}.`);
    });
  }

  const toggleSelection = (id: string) => setSelectedIds((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);

  return (
    <div className="min-h-full bg-[#f8fafc] pb-10 text-slate-900">
      <div className="mx-auto max-w-[1800px] space-y-6 p-4 sm:p-6 lg:p-8">
        <header className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-indigo-500"><Sparkles size={14} /> Master Catalog</div>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Products</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">One product master for POS, inventory, purchasing and warehouse operations.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => { setShowCommand(true); click(); }} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-600"><Command size={17} /> Command <kbd className="rounded-lg bg-slate-100 px-2 py-0.5 text-[10px]">Ctrl K</kbd></button>
            <button onClick={() => void load()} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:text-sky-600"><Upload size={17} /> Refresh catalog</button>
            <button onClick={() => void addProduct()} className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 active:translate-y-0"><Plus size={18} /> Add product</button>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, hint, Icon, tone }) => (
            <motion.div key={label} whileHover={{ y: -3 }} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-2xl ${toneClasses[tone]}`}><Icon size={19} /></div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p>
              <p className="mt-2 text-2xl font-black text-slate-950">{value}</p>
              <p className="mt-1 text-xs text-slate-500">{hint}</p>
            </motion.div>
          ))}
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative min-w-0 flex-1 xl:max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, SKU, barcode or brand..." className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm font-medium outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50" />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold outline-none focus:border-indigo-300">{categories.map((item) => <option key={item}>{item}</option>)}</select>
              <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold outline-none focus:border-indigo-300">{["All", "In Stock", "Low Stock", "Out of Stock"].map((item) => <option key={item}>{item}</option>)}</select>
              <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1">
                <button onClick={() => setView("grid")} className={`rounded-lg p-2 ${view === "grid" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400"}`}><Grid2X2 size={17} /></button>
                <button onClick={() => setView("table")} className={`rounded-lg p-2 ${view === "table" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400"}`}><List size={17} /></button>
              </div>
            </div>
          </div>
        </section>

        <AnimatePresence>
          {selectedIds.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="sticky top-4 z-30 flex flex-col gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/95 p-3 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-bold text-indigo-900">{selectedIds.length} selected</p>
              <div className="flex flex-wrap gap-2">
                <select defaultValue="" onChange={(event) => void applyCategory(event.target.value)} className="rounded-xl border border-indigo-100 bg-white px-3 py-2 text-xs font-bold text-slate-700"><option value="">Change category…</option>{categories.filter((item) => item !== "All").map((item) => <option key={item}>{item}</option>)}</select>
                <button onClick={() => void applyDiscount(5)} className="rounded-xl bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm hover:text-indigo-600">Apply 5% discount</button>
                <button onClick={() => void applyDiscount(10)} className="rounded-xl bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm hover:text-indigo-600">Apply 10%</button>
                <button onClick={() => void deleteSelected()} className="inline-flex items-center gap-1 rounded-xl bg-rose-600 px-3 py-2 text-xs font-bold text-white hover:bg-rose-700"><Trash2 size={14} /> Delete</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {notice && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="fixed right-5 top-5 z-[80] flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-2xl"><CheckCircle2 className="text-emerald-400" size={18} />{notice}</motion.div>}

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 8 }, (_, index) => <div key={index} className="h-64 animate-pulse rounded-3xl bg-white shadow-sm" />)}</div>
        ) : view === "grid" ? (
          <ProductGrid products={filtered} selectedIds={selectedIds} onToggleSelect={toggleSelection} onOpen={(product) => { setSelectedId(product.id); click(); }} />
        ) : (
          <ProductTable products={filtered} selectedIds={selectedIds} onToggleSelect={toggleSelection} onToggleAll={(checked) => setSelectedIds(checked ? filtered.map((item) => item.id) : [])} onOpen={(product) => { setSelectedId(product.id); click(); }} />
        )}

        <p className="px-1 text-xs font-medium text-slate-400">Showing {filtered.length.toLocaleString()} of {products.length.toLocaleString()} products · Inventory values update from the shared inventory service.</p>
      </div>

      <ProductDrawer product={products.find((item) => item.id === selectedId) ?? null} onClose={() => setSelectedId(null)} onSave={saveProduct} onDelete={async (id) => { const next = await inventoryService.delete(id); setProducts(next); setInventory(next); setSelectedId(null); success(); show("Product deleted."); }} />

      <AnimatePresence>
        {showCommand && (
          <motion.div className="fixed inset-0 z-[90] flex items-start justify-center bg-slate-950/30 p-4 pt-[12vh] backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setShowCommand(false)}>
            <motion.div initial={{ scale: 0.96, y: -12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: -12 }} onMouseDown={(event) => event.stopPropagation()} className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/70 bg-white shadow-2xl">
              <div className="border-b border-slate-100 p-5"><div className="flex items-center gap-3"><Command className="text-indigo-600" /><input autoFocus value={command} onChange={(event) => setCommand(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") runCommand(); }} placeholder="Adjust Rice +50" className="min-w-0 flex-1 bg-transparent text-lg font-semibold outline-none" /></div></div>
              <div className="space-y-3 p-5 text-sm"><p className="font-bold text-slate-900">Quick stock command</p><p className="text-slate-500">Type <span className="rounded-lg bg-slate-100 px-2 py-1 font-mono text-xs">Adjust Product Name +50</span> or <span className="rounded-lg bg-slate-100 px-2 py-1 font-mono text-xs">Adjust Product Name -10</span>.</p><button onClick={runCommand} className="rounded-xl bg-indigo-600 px-4 py-2.5 font-bold text-white hover:bg-indigo-700">Run command</button></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
