import { AnimatePresence, motion } from "framer-motion";
import { Camera, CreditCard, Edit3, MapPin, Save, ShieldCheck, Star, Tag, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type ReactNode } from "react";

import type { Customer, CustomerTier } from "../../modules/customers/types/Customer";
import CommunicationBar from "./CommunicationBar";
import { useUIFeedback } from "./useUIFeedback";

function money(value: number) {
  return `₦${Math.max(0, value).toLocaleString()}`;
}

function initials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "CU";
}

type CustomerProfileDrawerProps = {
  customer: Customer | null;
  lifetimeValue: number;
  activeOrders: number;
  recentSales: Array<{ id: string; invoiceNumber: string; date: string; total: number; status: string }>;
  onClose: () => void;
  onSave: (patch: Partial<Customer>) => Promise<void>;
  onDelete: () => Promise<void>;
};

const tierOptions: CustomerTier[] = ["Standard", "Loyal", "VIP", "Wholesale"];

export default function CustomerProfileDrawer({ customer, lifetimeValue, activeOrders, recentSales, onClose, onSave, onDelete }: CustomerProfileDrawerProps) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<Customer>>({});
  const [tagText, setTagText] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const { click, success, whoosh, error } = useUIFeedback();

  useEffect(() => {
    if (!customer) return;
    setForm({ ...customer });
    setEditing(false);
    setTagText("");
    whoosh();
  }, [customer, whoosh]);

  const tags = form.tags ?? customer?.tags ?? [];
  const displayCustomer = customer ? { ...customer, ...form } : null;
  const completion = useMemo(() => {
    if (!displayCustomer) return 0;
    const fields = [displayCustomer.phone, displayCustomer.email, displayCustomer.address, displayCustomer.city, displayCustomer.state, displayCustomer.companyName, displayCustomer.notes];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  }, [displayCustomer]);

  async function save() {
    if (!customer) return;
    setSaving(true);
    try {
      await onSave(form);
      success();
      setEditing(false);
    } catch {
      error();
    } finally {
      setSaving(false);
    }
  }

  function addTag() {
    const value = tagText.trim();
    if (!value) return;
    setForm((current) => ({ ...current, tags: Array.from(new Set([...(current.tags ?? []), value])) }));
    setTagText("");
    click();
  }

  function removeTag(tag: string) {
    setForm((current) => ({ ...current, tags: (current.tags ?? []).filter((item) => item !== tag) }));
    click();
  }

  function handleAvatar(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((current) => ({ ...current, avatarUrl: String(reader.result) }));
    reader.readAsDataURL(file);
    click();
  }

  return (
    <AnimatePresence>
      {customer && displayCustomer && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-[2px]" />
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 280, damping: 30 }} className="fixed inset-y-0 right-0 z-50 flex w-full max-w-2xl flex-col border-l border-slate-200 bg-[#f8fafc] shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur sm:px-7">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Customer 360</p>
                <p className="mt-1 text-sm font-semibold text-slate-700">{displayCustomer.customerCode}</p>
              </div>
              <div className="flex items-center gap-2">
                {editing ? (
                  <button type="button" onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-slate-800 disabled:opacity-50"><Save size={15} /> {saving ? "Saving..." : "Save"}</button>
                ) : (
                  <button type="button" onClick={() => { setEditing(true); click(); }} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50"><Edit3 size={15} /> Edit</button>
                )}
                <button type="button" onClick={onClose} className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"><X size={19} /></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 sm:p-7">
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <button type="button" onClick={() => editing && fileRef.current?.click()} className="group relative h-24 w-24 shrink-0 overflow-hidden rounded-3xl bg-gradient-to-br from-sky-100 via-violet-100 to-amber-100 ring-4 ring-white shadow-lg">
                    {displayCustomer.avatarUrl ? <img src={displayCustomer.avatarUrl} alt="" className="h-full w-full object-cover" /> : <div className="grid h-full w-full place-items-center text-2xl font-black text-slate-700">{initials(displayCustomer.name)}</div>}
                    {editing && <div className="absolute inset-0 grid place-items-center bg-slate-900/45 text-white opacity-0 transition group-hover:opacity-100"><Camera size={22} /></div>}
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatar} className="hidden" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-2xl font-black tracking-tight text-slate-900">{displayCustomer.name}</h2>
                      <span className="rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-bold text-sky-700">{displayCustomer.tier || "Standard"}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{displayCustomer.companyName || (displayCustomer.type === "business" ? "Business customer" : "Individual customer")}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1">{displayCustomer.phone || "No phone"}</span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1">{displayCustomer.email || "No email"}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2">
                  <Metric icon={<CreditCard size={16} />} label="Lifetime value" value={money(lifetimeValue)} tone="sky" />
                  <Metric icon={<Star size={16} />} label="Loyalty" value={(displayCustomer.loyaltyPoints ?? 0).toLocaleString()} tone="amber" />
                  <Metric icon={<ShieldCheck size={16} />} label="Active orders" value={String(activeOrders)} tone="emerald" />
                </div>
              </section>

              <section className="mt-5"><CommunicationBar customer={displayCustomer} /></section>

              <section className="mt-5 grid gap-5 lg:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between"><h3 className="font-bold text-slate-900">Customer details</h3><span className="text-xs font-semibold text-slate-400">{completion}% complete</span></div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"><motion.div initial={{ width: 0 }} animate={{ width: `${completion}%` }} className="h-full rounded-full bg-gradient-to-r from-sky-400 to-violet-500" /></div>
                  <div className="mt-5 grid gap-3">
                    <Field label="Name" value={displayCustomer.name} editing={editing} onChange={(value) => setForm((current) => ({ ...current, name: value }))} />
                    <Field label="Company" value={displayCustomer.companyName ?? ""} editing={editing} onChange={(value) => setForm((current) => ({ ...current, companyName: value }))} />
                    <Field label="Phone" value={displayCustomer.phone} editing={editing} onChange={(value) => setForm((current) => ({ ...current, phone: value }))} />
                    <Field label="Email" value={displayCustomer.email} editing={editing} onChange={(value) => setForm((current) => ({ ...current, email: value }))} />
                    <Field label="Address" value={displayCustomer.address} editing={editing} onChange={(value) => setForm((current) => ({ ...current, address: value }))} />
                    <div className="grid grid-cols-2 gap-3"><Field label="City" value={displayCustomer.city} editing={editing} onChange={(value) => setForm((current) => ({ ...current, city: value }))} /><Field label="State" value={displayCustomer.state} editing={editing} onChange={(value) => setForm((current) => ({ ...current, state: value }))} /></div>
                    <Field label="Tax ID" value={displayCustomer.taxId ?? ""} editing={editing} onChange={(value) => setForm((current) => ({ ...current, taxId: value }))} />
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-2"><Tag size={17} className="text-violet-500" /><h3 className="font-bold text-slate-900">Profile & loyalty</h3></div>
                  <div className="mt-4 grid gap-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Tier<select disabled={!editing} value={displayCustomer.tier ?? "Standard"} onChange={(event) => setForm((current) => ({ ...current, tier: event.target.value as CustomerTier }))} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-semibold text-slate-700 outline-none disabled:bg-slate-50">{tierOptions.map((tier) => <option key={tier}>{tier}</option>)}</select></label>
                    <Field label="Loyalty points" value={String(displayCustomer.loyaltyPoints ?? 0)} editing={editing} type="number" onChange={(value) => setForm((current) => ({ ...current, loyaltyPoints: Math.max(0, Number(value) || 0) }))} />
                    <Field label="Preferred payment" value={displayCustomer.preferredPaymentMethod ?? ""} editing={editing} onChange={(value) => setForm((current) => ({ ...current, preferredPaymentMethod: value }))} />
                    <Field label="Contact person" value={displayCustomer.contactPerson ?? ""} editing={editing} onChange={(value) => setForm((current) => ({ ...current, contactPerson: value }))} />
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Tags<div className="mt-2 flex flex-wrap gap-2">{tags.map((tag) => <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">{tag}{editing && <button type="button" onClick={() => removeTag(tag)}><X size={12} /></button>}</span>)}{editing && <div className="flex gap-1"><input value={tagText} onChange={(event) => setTagText(event.target.value)} onKeyDown={(event) => event.key === "Enter" && addTag()} placeholder="Add tag" className="w-24 rounded-full border border-dashed px-2.5 py-1 text-xs outline-none" /><button type="button" onClick={addTag} className="rounded-full bg-violet-100 px-2 text-violet-700">+</button></div>}</div></label>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Notes<textarea disabled={!editing} value={displayCustomer.notes ?? ""} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} rows={4} className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 p-3 text-sm font-normal text-slate-700 outline-none focus:border-violet-300 disabled:bg-slate-50" /></label>
                  </div>
                </div>
              </section>

              <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between"><div><h3 className="font-bold text-slate-900">Activity timeline</h3><p className="text-xs text-slate-400">Sales activity connected to this customer.</p></div><MapPin size={18} className="text-slate-300" /></div>
                <div className="mt-5 space-y-4">
                  {recentSales.length ? recentSales.map((sale) => <div key={sale.id} className="flex gap-3"><div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-sky-400 ring-4 ring-sky-50" /><div className="min-w-0 flex-1 rounded-2xl bg-slate-50 p-3"><div className="flex items-start justify-between gap-3"><div><p className="font-semibold text-slate-800">{sale.invoiceNumber}</p><p className="mt-0.5 text-xs text-slate-400">{sale.date} · {sale.status}</p></div><span className="font-bold text-slate-800">{money(sale.total)}</span></div></div></div>) : <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">No sales activity has been recorded for this customer yet.</div>}
                </div>
              </section>

              {editing && (
                <section className="mt-5 rounded-3xl border border-rose-100 bg-rose-50/60 p-5">
                  <div className="flex items-start justify-between gap-4"><div><h3 className="font-bold text-rose-900">Danger zone</h3><p className="mt-1 text-xs text-rose-700">Delete this customer from the local customer master.</p></div><button type="button" onClick={async () => { await onDelete(); success(); }} className="rounded-xl bg-white px-3 py-2 text-xs font-bold text-rose-600 shadow-sm ring-1 ring-rose-200 hover:bg-rose-100">Delete customer</button></div>
                </section>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Metric({ icon, label, value, tone }: { icon: ReactNode; label: string; value: string; tone: "sky" | "amber" | "emerald" }) {
  const classes = { sky: "bg-sky-50 text-sky-700", amber: "bg-amber-50 text-amber-700", emerald: "bg-emerald-50 text-emerald-700" }[tone];
  return <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3"><div className={`mb-2 grid h-8 w-8 place-items-center rounded-xl ${classes}`}>{icon}</div><p className="truncate text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p><p className="mt-1 truncate text-sm font-black text-slate-900">{value}</p></div>;
}

function Field({ label, value, editing, onChange, type = "text" }: { label: string; value: string; editing: boolean; onChange: (value: string) => void; type?: string }) {
  return <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}{editing ? <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-normal text-slate-700 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-50" /> : <p className="mt-1.5 rounded-xl bg-slate-50 p-3 text-sm font-semibold normal-case tracking-normal text-slate-700">{value || "Not provided"}</p>}</label>;
}
