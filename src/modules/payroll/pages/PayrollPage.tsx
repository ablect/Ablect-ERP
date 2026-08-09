import { motion } from "framer-motion";
import { Calculator, CheckCircle2, DollarSign, FileText, Play, Users } from "lucide-react";
import { useMemo, useState } from "react";

import PageContainer from "../../../components/ui/PageContainer";
import { useRevenueOrganizationStore } from "../../organization/store/RevenueOrganizationStore";

const money = (value: number) => `₦${Math.round(value).toLocaleString()}`;

export default function PayrollPage() {
  const employees = useRevenueOrganizationStore((state) => state.employees);
  const opportunities = useRevenueOrganizationStore((state) => state.opportunities);
  const payroll = useRevenueOrganizationStore((state) => state.payroll);
  const runPayroll = useRevenueOrganizationStore((state) => state.runPayroll);
  const [period, setPeriod] = useState("2026-08");
  const [processed, setProcessed] = useState(false);

  const preview = useMemo(() => employees.filter((employee) => employee.status === "Active").map((employee) => {
    const commission = opportunities.filter((item) => item.assignedTo === employee.id && item.stage === "won").reduce((sum, item) => sum + item.amount * employee.commissionRate, 0);
    const allowance = employee.salary * 0.05;
    const tax = Math.max(0, (employee.salary + commission + allowance) * 0.08);
    return { employee, commission, allowance, tax, net: employee.salary + commission + allowance - tax };
  }), [employees, opportunities]);

  const totalGross = preview.reduce((sum, item) => sum + item.employee.salary + item.commission + item.allowance, 0);
  const totalCommission = preview.reduce((sum, item) => sum + item.commission, 0);
  const totalNet = preview.reduce((sum, item) => sum + item.net, 0);

  function handleRunPayroll() {
    runPayroll(period);
    setProcessed(true);
  }

  return (
    <PageContainer>
      <div className="min-h-full space-y-6 bg-[#f8fafc] pb-28">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">Organization Hub</p><h1 className="text-3xl font-black tracking-tight text-slate-950">Payroll Command Center</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Preview payroll from the current HR roster. Sales commissions are calculated directly from Closed Won CRM opportunities, so the same revenue event drives both performance and pay.</p></div><label className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"><span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Pay period</span><input type="month" value={period} onChange={(event) => { setPeriod(event.target.value); setProcessed(false); }} className="mt-1 bg-transparent text-sm font-black text-slate-800 outline-none" /></label></div></section>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><Users className="text-sky-600" size={19} /><p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">Active employees</p><p className="mt-1 text-2xl font-black text-slate-950">{preview.length}</p></div><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><DollarSign className="text-violet-600" size={19} /><p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">Gross payroll</p><p className="mt-1 text-2xl font-black text-slate-950">{money(totalGross)}</p></div><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><Calculator className="text-amber-600" size={19} /><p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">CRM commission</p><p className="mt-1 text-2xl font-black text-slate-950">{money(totalCommission)}</p></div><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><CheckCircle2 className="text-emerald-600" size={19} /><p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">Estimated net</p><p className="mt-1 text-2xl font-black text-slate-950">{money(totalNet)}</p></div></div>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-black text-slate-950">Upcoming pay run</h2><p className="text-sm text-slate-500">Commission is recalculated from the current CRM state.</p></div>{processed && <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700"><CheckCircle2 size={14} /> Payroll generated</span>}</div><div className="overflow-x-auto"><table className="min-w-[820px] w-full"><thead className="bg-slate-50"><tr>{["Employee", "Base salary", "Commission", "Allowance", "Tax", "Estimated net"].map((header) => <th key={header} className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">{header}</th>)}</tr></thead><tbody>{preview.map((item) => <motion.tr key={item.employee.id} whileHover={{ backgroundColor: "#f8fafc" }} className="border-t border-slate-100"><td className="px-5 py-4"><p className="text-sm font-black text-slate-900">{item.employee.name}</p><p className="text-xs text-slate-500">{item.employee.position}</p></td><td className="px-5 py-4 text-sm font-bold text-slate-700">{money(item.employee.salary)}</td><td className="px-5 py-4 text-sm font-black text-violet-600">{money(item.commission)}</td><td className="px-5 py-4 text-sm font-bold text-slate-700">{money(item.allowance)}</td><td className="px-5 py-4 text-sm font-bold text-rose-600">{money(item.tax)}</td><td className="px-5 py-4 text-sm font-black text-emerald-700">{money(item.net)}</td></motion.tr>)}</tbody></table></div></section>

        <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]"><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600"><FileText size={18} /></div><div><h2 className="font-black text-slate-950">Commission audit</h2><p className="text-xs text-slate-500">Why the commission exists on this pay run.</p></div></div><div className="mt-5 space-y-3">{preview.filter((item) => item.commission > 0).map((item) => <div key={item.employee.id} className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-3"><div><p className="text-sm font-bold text-slate-800">{item.employee.name}</p><p className="text-xs text-slate-500">{item.employee.commissionRate * 100}% of Closed Won value</p></div><p className="text-sm font-black text-violet-700">{money(item.commission)}</p></div>)}{!preview.some((item) => item.commission > 0) && <p className="text-sm text-slate-400">No commissionable Closed Won deals.</p>}</div></div><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="font-black text-slate-950">Latest run</h2><p className="mt-2 text-sm text-slate-500">{payroll.length ? `${payroll.length} employees processed for ${payroll[0].period}.` : "No payroll run has been generated in this session."}</p><div className="mt-5 rounded-xl bg-sky-50 p-4"><p className="text-xs font-bold uppercase tracking-wider text-sky-600">Source of truth</p><p className="mt-1 text-sm font-semibold leading-6 text-sky-950">HR supplies the employee and salary data. CRM supplies Closed Won revenue. Payroll combines both here.</p></div></div></section>

        <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur"><div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-black text-slate-900">Ready to run {period} payroll?</p><p className="text-xs text-slate-500">This creates a processed payroll snapshot from the current CRM + HR state.</p></div><button type="button" onClick={handleRunPayroll} className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-700"><Play size={16} /> Run Payroll</button></div></div>
      </div>
    </PageContainer>
  );
}
