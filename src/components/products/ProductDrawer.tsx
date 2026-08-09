import { AnimatePresence, motion } from "framer-motion";
import { Barcode, ImagePlus, Layers3, MapPin, QrCode, Save, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";
import type { InventoryItem } from "../../modules/inventory/types/InventoryItem";

function money(value: number) { return `₦${Math.max(0, value).toLocaleString()}`; }

type Props = { product: InventoryItem | null; onClose: () => void; onSave: (product: InventoryItem) => Promise<void>; onDelete: (id: string) => Promise<void>; };

export default function ProductDrawer({ product, onClose, onSave, onDelete }: Props) {
  const [draft, setDraft] = useState<InventoryItem | null>(product);
  const [saving, setSaving] = useState(false);
  const [qr, setQr] = useState("");
  const barcodeRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => setDraft(product), [product]);
  useEffect(() => {
    if (!draft) return;
    const value = draft.barcode?.trim() || draft.sku;
    void QRCode.toDataURL(value, { width: 180, margin: 1 }).then(setQr).catch(() => setQr(""));
    if (barcodeRef.current && value) {
      try { JsBarcode(barcodeRef.current, value, { format: "CODE128", displayValue: true, height: 42, margin: 0, fontSize: 11 }); } catch { /* invalid barcode input */ }
    }
  }, [draft]);

  if (!product || !draft) return null;
  const set = <K extends keyof InventoryItem>(key: K, value: InventoryItem[K]) => setDraft((current) => current ? { ...current, [key]: value } : current);
  const imageFromFile = (file: File) => { const reader = new FileReader(); reader.onload = () => set("imageUrl", String(reader.result)); reader.readAsDataURL(file); };
  const save = async () => { setSaving(true); try { await onSave(draft); } finally { setSaving(false); } };

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[70] bg-slate-950/30 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
        <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 280, damping: 30 }} onMouseDown={(event) => event.stopPropagation()} className="absolute right-0 top-0 flex h-full w-full max-w-3xl flex-col bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-7"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-500">Product editor</p><h2 className="mt-1 text-xl font-black text-slate-950">{draft.itemName}</h2></div><button onClick={onClose} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900"><X /></button></div>
          <div className="flex-1 overflow-y-auto p-5 sm:p-7">
            <div className="grid gap-6 lg:grid-cols-[190px_1fr]">
              <div>
                <div className="relative h-48 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-50 via-white to-sky-50">{draft.imageUrl ? <img src={draft.imageUrl} alt={draft.itemName} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-indigo-200"><ImagePlus size={42} /></div>}</div>
                <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 px-3 py-2.5 text-xs font-bold text-slate-600 hover:border-indigo-300 hover:text-indigo-600"><ImagePlus size={15} /> Add image<input type="file" accept="image/*" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) imageFromFile(file); }} /></label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="field">Product name<input value={draft.itemName} onChange={(event) => set("itemName", event.target.value)} /></label>
                <label className="field">Brand<input value={draft.brand ?? ""} onChange={(event) => set("brand", event.target.value)} /></label>
                <label className="field">SKU<input value={draft.sku} onChange={(event) => set("sku", event.target.value)} /></label>
                <label className="field">Barcode<input value={draft.barcode ?? ""} onChange={(event) => set("barcode", event.target.value)} /></label>
                <label className="field">Category<input value={draft.category} onChange={(event) => set("category", event.target.value)} /></label>
                <label className="field">Warehouse<input value={draft.warehouse} onChange={(event) => set("warehouse", event.target.value)} /></label>
                <label className="field">Unit<input value={draft.unit} onChange={(event) => set("unit", event.target.value)} /></label>
                <label className="field">Reorder level<input type="number" min="0" value={draft.reorderLevel} onChange={(event) => set("reorderLevel", Number(event.target.value))} /></label>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <label className="field">Quantity<input type="number" min="0" value={draft.quantity} onChange={(event) => set("quantity", Number(event.target.value))} /></label>
              <label className="field">Unit cost<input type="number" min="0" value={draft.unitCost} onChange={(event) => set("unitCost", Number(event.target.value))} /></label>
              <label className="field">Retail price<input type="number" min="0" value={draft.sellingPrice} onChange={(event) => set("sellingPrice", Number(event.target.value))} /></label>
            </div>

            <label className="field mt-4">Description<textarea rows={3} value={draft.description ?? ""} onChange={(event) => set("description", event.target.value)} /></label>

            <div className="mt-7 grid gap-4 lg:grid-cols-2">
              <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5"><div className="flex items-center gap-2"><Layers3 size={18} className="text-indigo-600" /><h3 className="font-black">Variant & pricing foundation</h3></div><p className="mt-2 text-xs leading-5 text-slate-500">The product master is ready for variant-aware pricing and POS lookup. Keep each sellable SKU unique so sales and stock can share the same record.</p><div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-white p-3"><p className="text-[10px] font-bold uppercase text-slate-400">Retail</p><p className="mt-1 font-black">{money(draft.sellingPrice)}</p></div><div className="rounded-2xl bg-white p-3"><p className="text-[10px] font-bold uppercase text-slate-400">Margin</p><p className="mt-1 font-black text-emerald-600">{draft.sellingPrice > 0 ? `${Math.round(((draft.sellingPrice - draft.unitCost) / draft.sellingPrice) * 100)}%` : "0%"}</p></div></div></section>
              <section className="rounded-3xl border border-slate-200 bg-white p-5"><div className="flex items-center gap-2"><MapPin size={18} className="text-sky-600" /><h3 className="font-black">Spatial location</h3></div><div className="mt-4 flex items-center gap-2 text-sm font-bold text-slate-700"><span className="rounded-xl bg-sky-50 px-3 py-2 text-sky-700">{draft.warehouse || "Warehouse"}</span><span className="text-slate-300">→</span><span className="rounded-xl bg-indigo-50 px-3 py-2 text-indigo-700">Aisle</span><span className="text-slate-300">→</span><span className="rounded-xl bg-emerald-50 px-3 py-2 text-emerald-700">Bin</span></div></section>
            </div>

            <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5"><div className="flex items-center gap-2"><Barcode size={18} className="text-indigo-600" /><h3 className="font-black">Barcode & QR</h3></div><div className="mt-4 grid items-center gap-5 sm:grid-cols-[1fr_180px]"><div className="min-w-0 overflow-hidden rounded-2xl bg-slate-50 p-4"><svg ref={barcodeRef} className="h-auto max-w-full" /></div>{qr ? <img src={qr} alt="Product QR code" className="mx-auto h-44 w-44 rounded-2xl border border-slate-100" /> : <div className="flex h-44 items-center justify-center rounded-2xl bg-slate-50"><QrCode className="text-slate-300" size={52} /></div>}</div></section>
          </div>
          <div className="flex flex-col gap-2 border-t border-slate-100 bg-white p-4 sm:flex-row sm:justify-between sm:p-5"><button onClick={() => void onDelete(product.id)} className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50"><Trash2 size={17} /> Delete product</button><div className="flex gap-2"><button onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50">Cancel</button><button disabled={saving} onClick={() => void save()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 disabled:opacity-50"><Save size={17} /> {saving ? "Saving…" : "Save product"}</button></div></div>
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  );
}
