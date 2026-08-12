import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Building2, ChevronRight, Plus, RefreshCw, Sparkles, UserPlus, Users, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { customerService } from "../../modules/customers/services/CustomerService";
import { createCustomerCode } from "../../modules/crm/services/CustomerService";
import { useCustomerStore } from "../../modules/customers/store/CustomerStore";
import type { Customer, CustomerStatus, CustomerTier, CustomerType } from "../../modules/customers/types/Customer";
import { saleService } from "../../modules/sales/services/SaleService";
import type { Sale } from "../../modules/sales/types/Sale";
import CustomerProfileDrawer from "./CustomerProfileDrawer";
import CustomerTable from "./CustomerTable";
import { useUIFeedback } from "./useUIFeedback";

function money(value: number) {
  return `₦${Math.max(0, value).toLocaleString()}`;
}

const emptyForm: Partial<Customer> = {
  name: "",
  companyName: "",
  type: "individual",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  contactPerson: "",
  taxId: "",
  tier: "Standard",
  loyaltyPoints: 0,
  creditLimit: 0,
  outstandingBalance: 0,
  status: "active",
  preferredPaymentMethod: "Cash",
  tags: [],
  notes: "",
  whatsappOptIn: false,
};

export default function CustomerDashboard() {
  const customers = useCustomerStore((state) => state.customers);
  const setCustomers = useCustomerStore((state) => state.setCustomers);
  const [sales, setSales] = useState<Sale[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState<Partial<Customer>>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [segment, setSegment] = useState<"all" | CustomerTier>("all");
  const feedback = useUIFeedback();

  const selectedCustomer = customers.find((customer) => customer.id === selectedId) ?? null;
  const completedSales = sales.filter((sale) => sale.status === "Completed");

  useEffect(() => {
    void refresh();
  }, []);

  async function refresh() {
    setLoading(true);
    try {
      const [customerData, saleData] = await Promise.all([
        customerService.getAll(),
        saleService.getAll(),
      ]);
      setCustomers(customerData);
      setSales(saleData);
    } finally {
      setLoading(false);
    }
  }

  const metrics = useMemo(() => {
    const revenue = completedSales.reduce((sum, sale) => sum + sale.total, 0);
    const outstanding = customers.reduce((sum, customer) => sum + Math.max(0, customer.outstandingBalance), 0);
    const loyalty = customers.reduce((sum, customer) => sum + (customer.loyaltyPoints ?? 0), 0);
    return { revenue, outstanding, loyalty };
  }, [completedSales, customers]);

  const visibleCustomers = useMemo(
    () => segment === "all" ? customers : customers.filter((customer) => (customer.tier ?? "Standard") === segment),
    [customers, segment],
  );

  const customerSales = useMemo(() => {
    const map = new Map<string, Sale[]>();
    for (const sale of sales) {
      const existing = map.get(sale.customerId) ?? [];
      existing.push(sale);
      map.set(sale.customerId, existing);
    }
    return map;
  }, [sales]);

  const selectedSales = selectedCustomer ? (customerSales.get(selectedCustomer.id) ?? []).sort((a, b) => b.date.localeCompare(a.date)) : [];
  const selectedLifetimeValue = selectedSales.filter((sale) => sale.status === "Completed").reduce((sum, sale) => sum + sale.total, 0);
  const selectedActiveOrders = selectedSales.filter((sale) => sale.status === "Draft").length;

  async function createCustomer() {
    if (!form.name?.trim() || !form.phone?.trim()) {
      feedback.error();
      return;
    }

    setSaving(true);
    try {
      const now = new Date().toISOString();
      const customer: Customer = {
        id: crypto.randomUUID(),
        customerCode: createCustomerCode(customers),
        name: form.name.trim(),
        companyName: form.companyName?.trim() || undefined,
        type: (form.type ?? "individual") as CustomerType,
        phone: form.phone.trim(),
        email: form.email?.trim() || "",
        address: form.address?.trim() || "",
        city: form.city?.trim() || "",
        state: form.state?.trim() || "",
        contactPerson: form.contactPerson?.trim() || undefined,
        taxId: form.taxId?.trim() || undefined,
        tier: (form.tier ?? "Standard") as CustomerTier,
        loyaltyPoints: Math.max(0, Number(form.loyaltyPoints) || 0),
        creditLimit: Math.max(0, Number(form.creditLimit) || 0),
        outstandingBalance: 0,
        status: (form.status ?? "active") as CustomerStatus,
        preferredPaymentMethod: form.preferredPaymentMethod || "Cash",
        tags: form.tags ?? [],
        notes: form.notes?.trim() || undefined,
        whatsappOptIn: Boolean(form.whatsappOptIn),
        createdAt: now,
        updatedAt: now,
      };

      const data = await customerService.create(customer);
      setCustomers(data);
      setForm(emptyForm);
      setShowCreate(false);
      setSelectedId(customer.id);
      feedback.success();
    } catch {
      feedback.error();
    } finally {
      setSaving(false);
    }
  }

  async function updateCustomer(patch: Partial<Customer>) {
    if (!selectedCustomer) return;
    const updated = { ...selectedCustomer, ...patch, updatedAt: new Date().toISOString() };
    const data = await customerService.update(updated);
    setCustomers(data);
  }

  async function deleteCustomer() {
    if (!selectedCustomer) return;
    await customerService.delete(selectedCustomer.id);
    setCustomers(await customerService.getAll());
    setSelectedId(null);
  }

  return (
    <div className="min-h-full space-y-6 bg-[#f8fafc] pb-10">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="relative p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-sky-100/70 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-violet-100/60 blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-sky-700"><Sparkles size={13} /> Customer 360</div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Customer Command Center</h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">A single customer master for Sales, POS and CRM. Open any profile for contacts, loyalty, balances and purchase activity without leaving the workspace.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} type="button" onClick={() => { feedback.click(); void refresh(); }} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"><RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Refresh</motion.button>
              <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} type="button" onClick={() => { feedback.click(); setForm(emptyForm); setShowCreate(true); }} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800"><UserPlus size={16} /> Add customer</motion.button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Customers" value={customers.length.toLocaleString()} hint="Unified customer master" icon={<Users size={19} />} tone="sky" />
        <StatCard label="Customer value" value={money(metrics.revenue)} hint="Completed sales" icon={<ArrowUpRight size={19} />} tone="violet" />
        <StatCard label="Loyalty points" value={metrics.loyalty.toLocaleString()} hint="Across all customers" icon={<Sparkles size={19} />} tone="amber" />
        <StatCard label="Outstanding" value={money(metrics.outstanding)} hint="Open customer balances" icon={<Building2 size={19} />} tone="rose" />
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {(["all", "VIP", "Wholesale", "Loyal"] as const).map((item) => {
          const count = item === "all" ? customers.length : customers.filter((customer) => (customer.tier ?? "Standard") === item).length;
          const active = segment === item;
          return <button key={item} type="button" onClick={() => { setSegment(item); feedback.click(); }} className={`rounded-2xl border p-4 text-left transition ${active ? "border-slate-900 bg-slate-900 text-white shadow-lg" : "border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"}`}><div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-wider opacity-60">{item === "all" ? "All customers" : item}</span><ChevronRight size={16} className="opacity-50" /></div><p className="mt-2 text-2xl font-black">{count}</p><p className="mt-1 text-xs opacity-60">Open segment</p></button>;
        })}
      </section>

      <CustomerTable customers={visibleCustomers} onSelect={(customer) => { feedback.click(); setSelectedId(customer.id); }} />

      <CustomerProfileDrawer
        customer={selectedCustomer}
        lifetimeValue={selectedLifetimeValue}
        activeOrders={selectedActiveOrders}
        recentSales={selectedSales.slice(0, 8)}
        onClose={() => setSelectedId(null)}
        onSave={updateCustomer}
        onDelete={deleteCustomer}
      />

      <AnimatePresence>
        {showCreate && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm" onClick={() => setShowCreate(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.97, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97, y: 18 }} className="fixed inset-0 z-50 grid place-items-center p-4">
              <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl sm:p-8" onClick={(event) => event.stopPropagation()}>
                <div className="flex items-start justify-between gap-4"><div><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-sky-600">New customer</p><h2 className="mt-1 text-2xl font-black text-slate-900">Build customer profile</h2><p className="mt-1 text-sm text-slate-500">The same customer record is used by the POS and Sales workspace.</p></div><button type="button" onClick={() => setShowCreate(false)} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"><X /></button></div>
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <Input label="Customer name *" value={form.name ?? ""} onChange={(value) => setForm((current) => ({ ...current, name: value }))} />
                  <Input label="Company / business" value={form.companyName ?? ""} onChange={(value) => setForm((current) => ({ ...current, companyName: value }))} />
                  <Input label="Phone *" value={form.phone ?? ""} onChange={(value) => setForm((current) => ({ ...current, phone: value }))} />
                  <Input label="Email" value={form.email ?? ""} onChange={(value) => setForm((current) => ({ ...current, email: value }))} />
                  <Select label="Customer type" value={String(form.type ?? "individual")} options={["individual", "business"]} onChange={(value) => setForm((current) => ({ ...current, type: value as CustomerType }))} />
                  <Select label="Tier" value={String(form.tier ?? "Standard")} options={["Standard", "Loyal", "VIP", "Wholesale"]} onChange={(value) => setForm((current) => ({ ...current, tier: value as CustomerTier }))} />
                  <Input label="Address" value={form.address ?? ""} onChange={(value) => setForm((current) => ({ ...current, address: value }))} />
                  <Input label="City" value={form.city ?? ""} onChange={(value) => setForm((current) => ({ ...current, city: value }))} />
                  <Input label="State" value={form.state ?? ""} onChange={(value) => setForm((current) => ({ ...current, state: value }))} />
                  <Input label="Contact person" value={form.contactPerson ?? ""} onChange={(value) => setForm((current) => ({ ...current, contactPerson: value }))} />
                  <Input label="Tax ID" value={form.taxId ?? ""} onChange={(value) => setForm((current) => ({ ...current, taxId: value }))} />
                  <Input label="Credit limit" type="number" value={String(form.creditLimit ?? 0)} onChange={(value) => setForm((current) => ({ ...current, creditLimit: Math.max(0, Number(value) || 0) }))} />
                  <div className="sm:col-span-2"><label className="text-xs font-bold uppercase tracking-wider text-slate-400">Notes<textarea value={form.notes ?? ""} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} rows={4} className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 p-3 text-sm text-slate-700 outline-none focus:border-sky-300 focus:ring-4 focus:ring-sky-50" placeholder="Important preferences, delivery notes, business context..." /></label></div>
                </div>
                <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><button type="button" onClick={() => setShowCreate(false)} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600">Cancel</button><button type="button" disabled={saving} onClick={() => void createCustomer()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-50"><Plus size={17} /> {saving ? "Creating..." : "Create customer"}</button></div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ label, value, hint, icon, tone }: { label: string; value: string; hint: string; icon: React.ReactNode; tone: "sky" | "violet" | "amber" | "rose" }) {
  const tones = { sky: "bg-sky-50 text-sky-600", violet: "bg-violet-50 text-violet-600", amber: "bg-amber-50 text-amber-600", rose: "bg-rose-50 text-rose-600" }[tone];
  return <motion.div whileHover={{ y: -3 }} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg"><div className={`grid h-10 w-10 place-items-center rounded-xl ${tones}`}>{icon}</div><p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p><p className="mt-1 text-2xl font-black tracking-tight text-slate-900">{value}</p><p className="mt-1 text-xs text-slate-400">{hint}</p></motion.div>;
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}<input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-normal text-slate-700 outline-none transition focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-50" /></label>;
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-50">{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}
