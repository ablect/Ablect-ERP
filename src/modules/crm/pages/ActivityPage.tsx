import { AnimatePresence, motion } from "framer-motion";
import { Check, Clock3, Mail, Phone, Plus, Search, Users, Video, X } from "lucide-react";
import { useMemo, useState } from "react";

import PageContainer from "../../../components/ui/PageContainer";
import { useCustomerStore } from "../../customers/store/CustomerStore";
import { useRevenueOrganizationStore, type RevenueActivityType } from "../../organization/store/RevenueOrganizationStore";

const typeMeta: Record<RevenueActivityType, { label: string; icon: typeof Phone; tone: string }> = {
  call: { label: "Call", icon: Phone, tone: "bg-emerald-50 text-emerald-700" },
  email: { label: "Email", icon: Mail, tone: "bg-sky-50 text-sky-700" },
  meeting: { label: "Meeting", icon: Video, tone: "bg-violet-50 text-violet-700" },
  task: { label: "Task", icon: Check, tone: "bg-amber-50 text-amber-700" },
  "follow-up": { label: "Follow-up", icon: Clock3, tone: "bg-orange-50 text-orange-700" },
};

export default function ActivityPage() {
  const customers = useCustomerStore((state) => state.customers);
  const activities = useRevenueOrganizationStore((state) => state.activities);
  const opportunities = useRevenueOrganizationStore((state) => state.opportunities);
  const employees = useRevenueOrganizationStore((state) => state.employees);
  const addActivity = useRevenueOrganizationStore((state) => state.addActivity);
  const updateActivity = useRevenueOrganizationStore((state) => state.updateActivity);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState<RevenueActivityType>("call");
  const [subject, setSubject] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [opportunityId, setOpportunityId] = useState("");
  const [assignedTo, setAssignedTo] = useState("emp-001");
  const [dueDate, setDueDate] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    return query ? activities.filter((item) => `${item.subject} ${item.customerName} ${item.activityCode} ${item.type}`.toLowerCase().includes(query)) : activities;
  }, [activities, search]);

  const pending = activities.filter((item) => item.status === "pending");
  const completed = activities.filter((item) => item.status === "completed");
  const selected = activities.find((item) => item.id === selectedId) ?? null;

  function createActivity() {
    if (!subject.trim()) return;
    const customer = customers.find((item) => item.id === customerId);
    const created = new Date().toISOString();
    addActivity({ id: crypto.randomUUID(), activityCode: `ACT-${2000 + activities.length + 1}`, type, subject: subject.trim(), customerId: customer?.id, customerName: customer?.name ?? "General activity", opportunityId: opportunityId || undefined, assignedTo, dueDate: dueDate || undefined, status: "pending", createdAt: created, updatedAt: created });
    setSubject(""); setCustomerId(""); setOpportunityId(""); setDueDate(""); setShowForm(false);
  }

  return (
    <PageContainer>
      <div className="min-h-full space-y-6 bg-[#f8fafc] pb-12">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Action Feed</p><h1 className="text-3xl font-black tracking-tight text-slate-950">Activities</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Keep every call, meeting, email, task and follow-up connected to the customer, opportunity and responsible employee.</p></div><button type="button" onClick={() => setShowForm(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"><Plus size={17} /> Log activity</button></div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl bg-amber-50 p-4"><p className="text-xs font-bold uppercase tracking-wider text-amber-600">Pending</p><p className="mt-1 text-2xl font-black text-amber-950">{pending.length}</p></div><div className="rounded-2xl bg-emerald-50 p-4"><p className="text-xs font-bold uppercase tracking-wider text-emerald-600">Completed</p><p className="mt-1 text-2xl font-black text-emerald-950">{completed.length}</p></div><div className="rounded-2xl bg-sky-50 p-4"><p className="text-xs font-bold uppercase tracking-wider text-sky-600">Total touchpoints</p><p className="mt-1 text-2xl font-black text-sky-950">{activities.length}</p></div></div>
        </section>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"><Search size={17} className="text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search activity, customer or code..." className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none" /></div>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="space-y-4">{filtered.map((item) => { const meta = typeMeta[item.type]; const Icon = meta.icon; const owner = employees.find((employee) => employee.id === item.assignedTo); return <motion.button key={item.id} type="button" onClick={() => setSelectedId(item.id)} whileHover={{ x: 3 }} className="flex w-full items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left transition hover:border-sky-200 hover:bg-white hover:shadow-md"><div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${meta.tone}`}><Icon size={18} /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.activityCode}</span><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${meta.tone}`}>{meta.label}</span><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${item.status === "completed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{item.status}</span></div><p className="mt-1 text-sm font-black text-slate-900">{item.subject}</p><p className="mt-1 text-xs text-slate-500">{item.customerName} · {owner?.name ?? "Unassigned"}</p></div><div className="hidden text-right sm:block"><p className="text-xs font-bold text-slate-700">{item.dueDate ?? "No due date"}</p><p className="mt-1 text-[11px] text-slate-400">{item.opportunityId ? "Linked opportunity" : "Standalone"}</p></div></motion.button>; })}{!filtered.length && <div className="py-16 text-center"><Users className="mx-auto text-slate-300" size={32} /><p className="mt-3 text-sm font-bold text-slate-600">No activities match your search.</p></div>}</div></section>

        <AnimatePresence>
          {selected && <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/20 p-4 backdrop-blur-sm sm:items-center"><motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.98 }} className="w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">{selected.activityCode}</p><h2 className="mt-1 text-xl font-black text-slate-950">{selected.subject}</h2></div><button type="button" onClick={() => setSelectedId(null)} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"><X size={19} /></button></div><div className="mt-5 grid gap-3 sm:grid-cols-2"><div className="rounded-xl bg-sky-50 p-4"><p className="text-xs text-slate-500">Customer</p><p className="mt-1 font-bold text-slate-900">{selected.customerName}</p></div><div className="rounded-xl bg-violet-50 p-4"><p className="text-xs text-slate-500">Owner</p><p className="mt-1 font-bold text-slate-900">{employees.find((employee) => employee.id === selected.assignedTo)?.name ?? "Unassigned"}</p></div></div><div className="mt-4 rounded-xl border border-slate-200 p-4"><div className="flex items-center justify-between gap-3"><p className="text-sm font-bold text-slate-800">Status</p><button type="button" onClick={() => { updateActivity(selected.id, { status: selected.status === "completed" ? "pending" : "completed" }); setSelectedId(null); }} className="rounded-xl bg-slate-950 px-4 py-2 text-xs font-bold text-white">Mark {selected.status === "completed" ? "pending" : "completed"}</button></div></div><div className="mt-5 flex gap-3"><a href="/customers" className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-bold text-slate-700 hover:bg-slate-50">Open Customer 360</a><a href="/crm/opportunities" className="flex-1 rounded-xl bg-slate-950 px-4 py-3 text-center text-sm font-bold text-white hover:bg-slate-800">Open Opportunities</a></div></motion.div></div>}
        </AnimatePresence>

        <AnimatePresence>
          {showForm && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-sm"><motion.div initial={{ opacity: 0, scale: 0.97, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97, y: 10 }} className="w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl sm:p-8"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-amber-600">New touchpoint</p><h2 className="mt-1 text-2xl font-black text-slate-950">Log activity</h2></div><button type="button" onClick={() => setShowForm(false)} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"><X size={20} /></button></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="sm:col-span-2"><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">Subject</span><input value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="e.g. Follow up after quotation" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-300 focus:ring-4 focus:ring-sky-100" /></label><label><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">Type</span><select value={type} onChange={(event) => setType(event.target.value as RevenueActivityType)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">{Object.entries(typeMeta).map(([key, meta]) => <option key={key} value={key}>{meta.label}</option>)}</select></label><label><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">Due date</span><input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" /></label><label><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">Customer</span><select value={customerId} onChange={(event) => setCustomerId(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"><option value="">Select customer</option>{customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.name}</option>)}</select></label><label><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">Opportunity</span><select value={opportunityId} onChange={(event) => setOpportunityId(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"><option value="">No opportunity</option>{opportunities.map((opportunity) => <option key={opportunity.id} value={opportunity.id}>{opportunity.name}</option>)}</select></label><label className="sm:col-span-2"><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">Assigned employee</span><select value={assignedTo} onChange={(event) => setAssignedTo(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">{employees.map((employee) => <option key={employee.id} value={employee.id}>{employee.name} · {employee.position}</option>)}</select></label></div><div className="mt-7 flex justify-end gap-3"><button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700">Cancel</button><button type="button" onClick={createActivity} className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800">Save activity</button></div></motion.div></div>}
        </AnimatePresence>
      </div>
    </PageContainer>
  );
}
