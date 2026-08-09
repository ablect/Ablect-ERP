import { AnimatePresence, motion } from "framer-motion";
import { Barcode, Boxes, CalendarDays, MapPin, Package, QrCode, X } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import JsBarcode from "jsbarcode";
import QRCode from "qrcode";

import type { InventoryItem } from "../types/InventoryItem";

export type LedgerEvent = {
  id: string;
  label: string;
  detail: string;
  time: string;
};

type ItemContextDrawerProps = {
  item: InventoryItem | null;
  open: boolean;
  image?: string;
  ledger: LedgerEvent[];
  onClose: () => void;
  onImageChange: (itemId: string, image: string) => void;
};

export default function ItemContextDrawer({ item, open, image, ledger, onClose, onImageChange }: ItemContextDrawerProps) {
  const barcodeRef = useRef<SVGSVGElement | null>(null);
  const qrRef = useRef<HTMLCanvasElement | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "ledger">("overview");

  useEffect(() => {
    if (!item || !open) return;
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, item.sku || item.id, { format: "CODE128", width: 1.6, height: 46, displayValue: true, fontSize: 11, margin: 4, background: "transparent", lineColor: "#e2e8f0" });
    }
    if (qrRef.current) {
      void QRCode.toCanvas(qrRef.current, item.sku || item.id, { width: 112, margin: 1, color: { dark: "#e2e8f0", light: "#00000000" } });
    }
  }, [item, open]);

  function uploadImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !item) return;
    const reader = new FileReader();
    reader.onload = () => onImageChange(item.id, String(reader.result));
    reader.readAsDataURL(file);
  }

  return <AnimatePresence>
    {open && item && <>
      <motion.button aria-label="Close item details" className="fixed inset-0 z-40 cursor-default bg-black/45 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.aside className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[620px] flex-col border-l border-white/[0.08] bg-[#111318]/95 shadow-2xl shadow-black/60 backdrop-blur-2xl" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 330, damping: 34 }}>
        <header className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4"><div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-300">Spatial inventory view</p><h2 className="mt-1 truncate text-xl font-bold text-white">{item.itemName}</h2><p className="mt-0.5 text-xs text-slate-500">{item.sku}</p></div><button onClick={onClose} className="rounded-xl p-2 text-slate-500 transition hover:bg-white/[0.06] hover:text-white"><X size={19} /></button></header>
        <div className="flex gap-1 border-b border-white/[0.06] px-5 pt-3">{(["overview", "ledger"] as const).map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-t-xl px-4 py-2 text-xs font-semibold capitalize transition ${activeTab === tab ? "bg-white/[0.06] text-white" : "text-slate-600 hover:text-slate-300"}`}>{tab}</button>)}</div>
        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === "overview" ? <div className="space-y-5">
            <section className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4"><div className="relative h-24 w-24 overflow-hidden rounded-2xl bg-white/[0.05] ring-1 ring-white/[0.07]">{image ? <img src={image} alt={item.itemName} className="h-full w-full object-cover" /> : <Package className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-600" />}</div><div><p className="text-sm font-semibold text-white">Product image</p><p className="mt-1 text-xs leading-5 text-slate-500">Add a product image for faster visual identification across inventory workflows.</p><label className="mt-3 inline-flex cursor-pointer rounded-lg bg-white/[0.07] px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/[0.11]">{image ? "Replace image" : "Add image"}<input type="file" accept="image/*" className="hidden" onChange={uploadImage} /></label></div></section>
            <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">{[["On hand", item.quantity.toLocaleString()], ["Reorder", item.reorderLevel.toLocaleString()], ["Unit cost", `₦${item.unitCost.toLocaleString()}`], ["Sell price", `₦${item.sellingPrice.toLocaleString()}`]].map(([label, value]) => <div key={label} className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-3"><p className="text-[10px] uppercase tracking-wider text-slate-600">{label}</p><p className="mt-1 text-sm font-bold text-slate-100">{value}</p></div>)}</section>
            <section className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4"><div className="flex items-center gap-2"><MapPin size={16} className="text-indigo-300" /><h3 className="text-sm font-bold text-white">Spatial location</h3></div><div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400"><span className="rounded-lg bg-white/[0.06] px-3 py-2">{item.warehouse || "Warehouse"}</span><span className="text-slate-700">→</span><span className="rounded-lg bg-white/[0.06] px-3 py-2">Aisle · {item.category || "General"}</span><span className="text-slate-700">→</span><span className="rounded-lg bg-indigo-500/10 px-3 py-2 text-indigo-200">Bin · {item.sku.slice(-4)}</span></div></section>
            <section className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><Barcode size={16} className="text-indigo-300" /><h3 className="text-sm font-bold text-white">Barcode</h3></div><QrCode size={16} className="text-slate-600" /></div><div className="mt-4 flex flex-wrap items-center gap-5 rounded-xl bg-[#0F1115] p-4"><svg ref={barcodeRef} className="max-w-full" /><canvas ref={qrRef} className="h-28 w-28" /></div></section>
          </div> : <section className="space-y-3">{ledger.length ? ledger.map((event) => <motion.div key={event.id} layout initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="relative rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4"><div className="flex gap-3"><div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-300 shadow-[0_0_12px_rgba(129,140,248,.7)]" /><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><p className="text-sm font-semibold text-slate-200">{event.label}</p><span className="text-[10px] text-slate-600">{event.time}</span></div><p className="mt-1 text-xs leading-5 text-slate-500">{event.detail}</p></div></div></motion.div>) : <div className="rounded-2xl border border-dashed border-white/[0.08] p-8 text-center"><CalendarDays className="mx-auto text-slate-600" /><p className="mt-3 text-sm font-semibold text-slate-300">No motion events yet</p><p className="mt-1 text-xs text-slate-600">Inventory changes made from this workspace will appear here.</p></div>}</section>}
        </div>
        <footer className="border-t border-white/[0.07] p-4"><div className="flex items-center justify-between rounded-2xl bg-white/[0.035] px-4 py-3"><div className="flex items-center gap-2 text-xs text-slate-500"><Boxes size={15} /> Status</div><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${item.status === "Out of Stock" ? "bg-slate-500/10 text-slate-400" : item.status === "Low Stock" ? "bg-amber-400/10 text-amber-300" : "bg-emerald-400/10 text-emerald-300"}`}>{item.status}</span></div></footer>
      </motion.aside>
    </>}
  </AnimatePresence>;
}
