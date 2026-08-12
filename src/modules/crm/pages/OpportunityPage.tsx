import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Building2, CalendarDays, ChevronDown, DollarSign, GripVertical, Plus, Search, Target, UserRound, X } from "lucide-react";
import { useMemo, useState } from "react";

import PageContainer from "../../../components/ui/PageContainer";
import { useCustomerStore } from "../../customers/store/CustomerStore";
import { useRevenueOrganizationStore, type RevenueOpportunityStage } from "../../organization/store/RevenueOrganizationStore";

const stages: { id: RevenueOpportunityStage; label: string; tone: string }[] = [
  { id: "lead", label: "Lead", tone: "bg-slate-100 text-slate-700" },
  { id: "meeting", label: "Meeting", tone: "bg-sky-50 text-sky-700" },
  { id: "proposal", label: "Proposal", tone: "bg-violet-50 text-violet-700" },
  { id: "won", label: "Closed Won", tone: "bg-emerald-50 text-emerald-700" },
  { id: "lost", label: "Closed Lost", tone: "bg-rose-50 text-rose-700" },
];

const money = (value: number) => `₦${Math.round(value).toLocaleString()}`;

export default function OpportunityPage() {
  const customers = useCustomerStore((state) => state.customers);
  const opportunities = useRevenueOrganizationStore((state) => state.opportunities);
  const employees = useRevenueOrganizationStore((state) => state.employees);
  const addOpportunity = useRevenueOrganizationStore((state) => state.addOpportunity);
  const moveOpportunity = useRevenueOrganizationStore((state) => state.moveOpportunity);
  const updateOpportunity = useRevenueOrganizationStore((state) => state.updateOpportunity);

  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", customerId: "", amount: "", assignedTo: "emp-001", stage: "lead" as RevenueOpportunityStage });

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    return query ? opportunities.filter((item) => `${item.name} ${item.customerName} ${item.opportunityCode}`.toLowerCase().includes(query)) : opportunities;
  }, [opportunities, search]);

  const selected = opportunities.find((item) => item.id === selectedId) ?? null;
  const selectedOwner = selected ? employees.find((employee) => employee.id === selected.assignedTo) : undefined;
  const pipeline = opportunities.filter((item) => item.stage !== "lost").reduce((sum, item) => sum + item.amount, 0);
  const won = opportunities.filter((item) => item.stage === "won").reduce((sum, item) => sum + item.amount, 0);

  function createOpportunity() {
    if (!form.name.trim() || !Number(form.amount)) return;
    const customer = customers.find((item) => item.id === form.customerId);
    const created = new Date().toISOString();
    addOpportunity({
      id: crypto.randomUUID(),
      opportunityCode: `OPP-${1000 + opportunities.length + 1}`,
      name: form.name.trim(),
      customerId: customer?.id,
      customerName: customer?.name ?? "Unassigned customer",
      assignedTo: form.assignedTo,
      stage: form.stage,
      amount: Number(form.amount),
      probability: form.stage === "won" ? 100 : form.stage === "lost" ? 0 : 30,
      source: "CRM",
      createdAt: created,
      updatedAt: created,
    });
    setForm({ name: "", customerId: "", amount: "", assignedTo: "emp-001", stage: "lead" });
    setShowCreate(false);
  }

  function dropOnStage(stage: RevenueOpportunityStage) {
    if (draggedId) moveOpportunity(draggedId, stage);
    setDraggedId(null);
  }

  return (
    <PageContainer>
      <div className="min-h-full space-y-6 bg-[#f8fafc] pb-12">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div><p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-600">Pipeline Engine</p><h1 className="text-3xl font-black tracking-tight text-slate-950">Opportunities</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Move deals through the revenue lifecycle. Each opportunity is linked to a customer and sales employee, and Closed Won values immediately feed the commission calculation in Payroll.</p></div>
            <button type="button" onClick={() => setShowCreate(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800"><Plus size={17} /> New opportunity</button>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl bg-sky-50 p-4"><p className="text-xs font-bold uppercase tracking-wider text-sky-600">Pipeline</p><p className="mt-1 text-xl font-black text-sky-900">{money(pipeline)}</p></div><div className="rounded-2xl bg-emerald-50 p-4"><p className="text-xs font-bold uppercase tracking-wider text-emerald-600">Won</p><p className="mt-1 text-xl font-black text-emerald-900">{money(won)}</p></div><div className="rounded-2xl bg-violet-50 p-4"><p className="text-xs font-bold uppercase tracking-wider text-violet-600">Deals</p><p className="mt-1 text-xl font-black text-violet-900">{opportunities.length}</p></div></div>
        </section>

        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center"><div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl bg-slate-50 px-4 py-3"><Search size={17} className="shrink-0 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search opportunity, customer or code..." className="min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-800 outline-none" /></div><div className="px-2 text-xs font-semibold text-slate-400">Drag cards between stages</div></div>

        <div className="grid gap-4 overflow-x-auto pb-3 xl:grid-cols-5">
          {stages.map((stage) => {
            const items = filtered.filter((item) => item.stage === stage.id);
            return <div key={stage.id} onDragOver={(event) => event.preventDefault()} onDrop={() => dropOnStage(stage.id)} className="min-w-[270px] rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="mb-3 flex items-center justify-between gap-3 px-1"><div className="flex items-center gap-2"><span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${stage.tone}`}>{stage.label}</span><span className="text-xs font-bold text-slate-400">{items.length}</span></div><ChevronDown size={15} className="text-slate-300" /></div>
              <div className="min-h-[230px] space-y-3">
                {items.map((item) => <motion.button key={item.id} type="button" draggable onDragStart={() => setDraggedId(item.id)} onClick={() => setSelectedId(item.id)} whileHover={{ y: -3 }} whileTap={{ scale: 0.99 }} className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-sky-200 hover:shadow-lg">
                  <div className="flex items-start gap-2"><GripVertical size={16} className="mt-0.5 shrink-0 text-slate-300" /><div className="min-w-0 flex-1"><p className="truncate text-[11px] font-bold uppercase tracking-wider text-slate-400">{item.opportunityCode}</p><p className="mt-1 line-clamp-2 text-sm font-black text-slate-900">{item.name}</p></div></div>
                  <div className="mt-4 flex items-center justify-between gap-3"><span className="text-sm font-black text-slate-900">{money(item.amount)}</span><span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600">{item.probability}%</span></div>
                  <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3"><div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-violet-500 text-[10px] font-black text-white">{item.customerName.slice(0, 2).toUpperCase()}</div><p className="truncate text-xs font-semibold text-slate-500">{item.customerName}</p></div>
                </motion.button>)}
                {!items.length && <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-xs font-medium text-slate-400">Drop a deal here</div>}
              </div>
            </div>;
          })}
        </div>

        <AnimatePresence>
          {selected && <>
            <motion.button aria-label="Close opportunity drawer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedId(null)} className="fixed inset-0 z-40 cursor-default bg-slate-950/20 backdrop-blur-[2px]" />
            <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 260 }} className="fixed right-0 top-0 z-50 flex h-full w-full max-w-xl flex-col border-l border-slate-200 bg-white shadow-2xl">
              <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-6"><div className="min-w-0"><p className="text-xs font-bold uppercase tracking-wider text-violet-600">{selected.opportunityCode}</p><h2 className="mt-1 text-2xl font-black text-slate-950">{selected.name}</h2><p className="mt-1 text-sm text-slate-500">{selected.customerName}</p></div><button type="button" onClick={() => setSelectedId(null)} className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"><X size={20} /></button></div>
              <div className="flex-1 space-y-5 overflow-y-auto p-6">
                <div className="grid grid-cols-2 gap-3"><div className="rounded-2xl bg-sky-50 p-4"><DollarSign size={17} className="text-sky-600" /><p className="mt-3 text-xs font-semibold text-slate-500">Deal value</p><p className="text-xl font-black text-sky-950">{money(selected.amount)}</p></div><div className="rounded-2xl bg-emerald-50 p-4"><Target size={17} className="text-emerald-600" /><p className="mt-3 text-xs font-semibold text-slate-500">Probability</p><p className="text-xl font-black text-emerald-950">{selected.probability}%</p></div></div>
                <div className="rounded-2xl border border-slate-200 p-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Relationship links</p><div className="mt-4 space-y-3"><div className="flex items-center gap-3"><Building2 size={17} className="text-sky-500" /><div><p className="text-xs text-slate-400">Customer</p><p className="text-sm font-bold text-slate-800">{selected.customerName}</p></div></div><div className="flex items-center gap-3"><UserRound size={17} className="text-violet-500" /><div><p className="text-xs text-slate-400">Sales owner</p><p className="text-sm font-bold text-slate-800">{selectedOwner?.name ?? "Unassigned"}</p></div></div><div className="flex items-center gap-3"><CalendarDays size={17} className="text-amber-500" /><div><p className="text-xs text-slate-400">Expected close</p><p className="text-sm font-bold text-slate-800">{selected.expectedCloseDate ?? "Not set"}</p></div></div></div></div>
                <div className="rounded-2xl border border-slate-200 p-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Stage</p><div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">{stages.map((item) => <button key={item.id} type="button" onClick={() => updateOpportunity(selected.id, { stage: item.id, probability: item.id === "won" ? 100 : item.id === "lost" ? 0 : selected.probability })} className={`rounded-xl px-2 py-2 text-[11px] font-bold transition ${selected.stage === item.id ? item.tone : "bg-slate-50 text-slate-400 hover:bg-slate-100"}`}>{item.label}</button>)}</div></div>
                {selected.stage === "won" && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">Closed Won is now eligible for the Payroll commission engine for {selectedOwner?.name ?? "the assigned rep"}.</div>}
              </div>
              <div className="border-t border-slate-200 bg-white p-5"><div className="flex flex-wrap gap-3"><a href="/customers" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50">Customer 360 <ArrowRight size={16} /></a><a href="/crm/activities" className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-800">Log activity <ArrowRight size={16} /></a></div></div>
            </motion.aside>
          </>}
        </AnimatePresence>

        <AnimatePresence>
          {showCreate && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-sm"><motion.div initial={{ opacity: 0, scale: 0.97, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97, y: 10 }} className="w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl sm:p-8"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-sky-600">New revenue</p><h2 className="mt-1 text-2xl font-black text-slate-950">Create opportunity</h2></div><button type="button" onClick={() => setShowCreate(false)} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"><X size={20} /></button></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="sm:col-span-2"><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">Opportunity name</span><input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-300 focus:ring-4 focus:ring-sky-100" placeholder="e.g. Enterprise solar deployment" /></label><label><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">Customer</span><select value={form.customerId} onChange={(event) => setForm({ ...form, customerId: event.target.value })} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"><option value="">Select customer</option>{customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.name}</option>)}</select></label><label><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">Value</span><input type="number" min="0" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-300 focus:ring-4 focus:ring-sky-100" placeholder="0" /></label><label><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">Sales owner</span><select value={form.assignedTo} onChange={(event) => setForm({ ...form, assignedTo: event.target.value })} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none">{employees.map((employee) => <option key={employee.id} value={employee.id}>{employee.name}</option>)}</select></label><label><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">Starting stage</span><select value={form.stage} onChange={(event) => setForm({ ...form, stage: event.target.value as RevenueOpportunityStage })} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none">{stages.map((stage) => <option key={stage.id} value={stage.id}>{stage.label}</option>)}</select></label></div><div className="mt-7 flex justify-end gap-3"><button type="button" onClick={() => setShowCreate(false)} className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700">Cancel</button><button type="button" onClick={createOpportunity} className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800">Create opportunity</button></div></motion.div></div>}
        </AnimatePresence>
      </div>
    </PageContainer>
  );
}
