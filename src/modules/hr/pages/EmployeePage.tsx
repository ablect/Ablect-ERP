import { AnimatePresence, motion } from "framer-motion";
import { BriefcaseBusiness, Mail, Phone, Plus, Search, TrendingUp, Users, X } from "lucide-react";
import { useMemo, useState } from "react";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";

import PageContainer from "../../../components/ui/PageContainer";
import { useRevenueOrganizationStore, type RevenueEmployee } from "../../organization/store/RevenueOrganizationStore";

const money = (value: number) => `₦${Math.round(value).toLocaleString()}`;

export default function EmployeePage() {
  const employees = useRevenueOrganizationStore((state) => state.employees);
  const opportunities = useRevenueOrganizationStore((state) => state.opportunities);
  const activities = useRevenueOrganizationStore((state) => state.activities);
  const addEmployee = useRevenueOrganizationStore((state) => state.addEmployee);
  const commissionForEmployee = useRevenueOrganizationStore((state) => state.commissionForEmployee);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", department: "Sales", position: "Sales Executive", salary: "", commissionRate: "2" });

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    return query ? employees.filter((employee) => `${employee.name} ${employee.employeeNumber} ${employee.department} ${employee.position}`.toLowerCase().includes(query)) : employees;
  }, [employees, search]);

  const columns = useMemo<ColumnDef<RevenueEmployee>[]>(() => [
    { accessorKey: "employeeNumber", header: "Employee" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "department", header: "Department" },
    { accessorKey: "position", header: "Position" },
    { accessorKey: "salary", header: "Base salary", cell: ({ getValue }) => money(Number(getValue())) },
    { accessorKey: "status", header: "Status" },
  ], []);

  const table = useReactTable({ data: filtered, columns, getCoreRowModel: getCoreRowModel() });
  const selected = employees.find((employee) => employee.id === selectedId) ?? null;
  const selectedWon = selected ? opportunities.filter((item) => item.assignedTo === selected.id && item.stage === "won") : [];
  const selectedActivities = selected ? activities.filter((item) => item.assignedTo === selected.id) : [];
  const selectedCommission = selected ? commissionForEmployee(selected.id) : 0;

  function createEmployee() {
    if (!form.name.trim() || !form.email.trim() || !Number(form.salary)) return;
    const now = new Date().toISOString();
    addEmployee({ id: crypto.randomUUID(), employeeNumber: `EMP-${String(employees.length + 1).padStart(3, "0")}`, name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(), department: form.department, position: form.position, salary: Number(form.salary), commissionRate: Number(form.commissionRate) / 100, status: "Active", hiredDate: now.slice(0, 10) });
    setForm({ name: "", email: "", phone: "", department: "Sales", position: "Sales Executive", salary: "", commissionRate: "2" });
    setShowCreate(false);
  }

  return (
    <PageContainer>
      <div className="min-h-full space-y-6 bg-[#f8fafc] pb-12">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Organization Hub</p><h1 className="text-3xl font-black tracking-tight text-slate-950">People & HR</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">A living employee directory connected to CRM performance. Sales activity and Closed Won opportunities are visible from each employee profile and flow directly into commission calculations.</p></div><button type="button" onClick={() => setShowCreate(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"><Plus size={17} /> Add employee</button></div><div className="mt-6 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl bg-emerald-50 p-4"><Users size={18} className="text-emerald-600" /><p className="mt-3 text-xs font-bold uppercase tracking-wider text-emerald-600">Active staff</p><p className="mt-1 text-2xl font-black text-emerald-950">{employees.filter((employee) => employee.status === "Active").length}</p></div><div className="rounded-2xl bg-sky-50 p-4"><TrendingUp size={18} className="text-sky-600" /><p className="mt-3 text-xs font-bold uppercase tracking-wider text-sky-600">Won deals</p><p className="mt-1 text-2xl font-black text-sky-950">{opportunities.filter((item) => item.stage === "won").length}</p></div><div className="rounded-2xl bg-violet-50 p-4"><BriefcaseBusiness size={18} className="text-violet-600" /><p className="mt-3 text-xs font-bold uppercase tracking-wider text-violet-600">Sales commission pool</p><p className="mt-1 text-2xl font-black text-violet-950">{money(employees.reduce((sum, employee) => sum + commissionForEmployee(employee.id), 0))}</p></div></div></section>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"><Search size={17} className="text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search employee, department or position..." className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none" /></div>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="overflow-x-auto"><table className="min-w-[760px] w-full"><thead className="border-b border-slate-200 bg-slate-50"><tr>{table.getHeaderGroups()[0].headers.map((header) => <th key={header.id} className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">{flexRender(header.column.columnDef.header, header.getContext())}</th>)}</tr></thead><tbody>{table.getRowModel().rows.map((row) => <motion.tr key={row.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileHover={{ backgroundColor: "#f8fafc" }} onClick={() => setSelectedId(row.original.id)} className="cursor-pointer border-b border-slate-100 transition last:border-0">{row.getVisibleCells().map((cell) => <td key={cell.id} className="px-5 py-4 text-sm font-semibold text-slate-700">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>)}</motion.tr>)}</tbody></table></div></section>

        <AnimatePresence>
          {selected && <><motion.button aria-label="Close employee profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedId(null)} className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-[2px]" /><motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 260 }} className="fixed right-0 top-0 z-50 h-full w-full max-w-xl overflow-y-auto border-l border-slate-200 bg-white shadow-2xl"><div className="flex items-start justify-between border-b border-slate-200 p-6"><div><p className="text-xs font-bold uppercase tracking-wider text-emerald-600">{selected.employeeNumber}</p><h2 className="mt-1 text-2xl font-black text-slate-950">{selected.name}</h2><p className="mt-1 text-sm text-slate-500">{selected.position} · {selected.department}</p></div><button type="button" onClick={() => setSelectedId(null)} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"><X size={20} /></button></div><div className="space-y-5 p-6"><div className="grid grid-cols-2 gap-3"><div className="rounded-2xl bg-sky-50 p-4"><p className="text-xs text-slate-500">Base salary</p><p className="mt-1 text-xl font-black text-sky-950">{money(selected.salary)}</p></div><div className="rounded-2xl bg-violet-50 p-4"><p className="text-xs text-slate-500">CRM commission</p><p className="mt-1 text-xl font-black text-violet-950">{money(selectedCommission)}</p></div></div><div className="rounded-2xl border border-slate-200 p-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Contact</p><div className="mt-4 space-y-3"><div className="flex items-center gap-3 text-sm font-semibold text-slate-700"><Mail size={17} className="text-sky-500" />{selected.email}</div><div className="flex items-center gap-3 text-sm font-semibold text-slate-700"><Phone size={17} className="text-emerald-500" />{selected.phone || "No phone"}</div></div></div><div className="rounded-2xl border border-slate-200 p-4"><div className="flex items-center justify-between"><p className="font-black text-slate-900">Performance</p><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">{selectedWon.length} won</span></div><div className="mt-4 space-y-3">{selectedWon.map((item) => <div key={item.id} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3"><div className="min-w-0"><p className="truncate text-sm font-bold text-slate-800">{item.name}</p><p className="text-xs text-slate-500">{item.customerName}</p></div><p className="shrink-0 text-sm font-black text-emerald-600">{money(item.amount)}</p></div>)}{!selectedWon.length && <p className="text-sm text-slate-400">No Closed Won opportunities yet.</p>}</div></div><div className="rounded-2xl border border-slate-200 p-4"><p className="font-black text-slate-900">Activity load</p><p className="mt-1 text-sm text-slate-500">{selectedActivities.length} recorded CRM activities assigned to this employee.</p></div><a href="/payroll" className="block rounded-xl bg-slate-950 px-4 py-3 text-center text-sm font-bold text-white hover:bg-slate-800">Open payroll calculation</a></div></motion.aside></>}
        </AnimatePresence>

        <AnimatePresence>
          {showCreate && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-sm"><motion.div initial={{ opacity: 0, scale: 0.97, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97, y: 10 }} className="w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl sm:p-8"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-emerald-600">People</p><h2 className="mt-1 text-2xl font-black text-slate-950">Add employee</h2></div><button type="button" onClick={() => setShowCreate(false)} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"><X size={20} /></button></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="sm:col-span-2"><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">Full name</span><input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" /></label><label><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">Email</span><input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" /></label><label><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">Phone</span><input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" /></label><label><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">Department</span><select value={form.department} onChange={(event) => setForm({ ...form, department: event.target.value })} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"><option>Sales</option><option>Operations</option><option>Finance</option><option>HR</option><option>IT</option></select></label><label><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">Position</span><input value={form.position} onChange={(event) => setForm({ ...form, position: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" /></label><label><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">Base salary</span><input type="number" min="0" value={form.salary} onChange={(event) => setForm({ ...form, salary: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" /></label><label><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">Commission %</span><input type="number" min="0" step="0.1" value={form.commissionRate} onChange={(event) => setForm({ ...form, commissionRate: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" /></label></div><div className="mt-7 flex justify-end gap-3"><button type="button" onClick={() => setShowCreate(false)} className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700">Cancel</button><button type="button" onClick={createEmployee} className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white">Save employee</button></div></motion.div></div>}
        </AnimatePresence>
      </div>
    </PageContainer>
  );
}
