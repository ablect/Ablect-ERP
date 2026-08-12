import { motion } from "framer-motion";
import { Activity, ArrowUpRight, CalendarClock, DollarSign, Target, TrendingUp, Users } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import PageContainer from "../../../components/ui/PageContainer";
import { useCustomerStore } from "../../customers/store/CustomerStore";
import { useRevenueOrganizationStore } from "../../organization/store/RevenueOrganizationStore";

const chartData = [
  { month: "Mar", revenue: 4.2 },
  { month: "Apr", revenue: 5.1 },
  { month: "May", revenue: 6.4 },
  { month: "Jun", revenue: 7.1 },
  { month: "Jul", revenue: 8.6 },
  { month: "Aug", revenue: 10.2 },
];

const money = (value: number) => `₦${Math.round(value).toLocaleString()}`;

export default function CRMDashboardPage() {
  const customers = useCustomerStore((state) => state.customers);
  const opportunities = useRevenueOrganizationStore((state) => state.opportunities);
  const activities = useRevenueOrganizationStore((state) => state.activities);
  const employees = useRevenueOrganizationStore((state) => state.employees);

  const pipeline = opportunities.filter((item) => item.stage !== "lost").reduce((sum, item) => sum + item.amount, 0);
  const wonValue = opportunities.filter((item) => item.stage === "won").reduce((sum, item) => sum + item.amount, 0);
  const weighted = opportunities.reduce((sum, item) => sum + item.amount * (item.probability / 100), 0);
  const pending = activities.filter((item) => item.status === "pending").length;
  const decided = opportunities.filter((item) => item.stage === "won" || item.stage === "lost").length;
  const winRate = decided ? Math.round((opportunities.filter((item) => item.stage === "won").length / decided) * 100) : 0;

  const cards = [
    { label: "Pipeline value", value: money(pipeline), note: `${opportunities.length} opportunities`, icon: DollarSign, tone: "from-sky-500 to-indigo-500" },
    { label: "Weighted pipeline", value: money(weighted), note: "Probability adjusted", icon: Target, tone: "from-violet-500 to-fuchsia-500" },
    { label: "Won revenue", value: money(wonValue), note: `${winRate}% win rate`, icon: TrendingUp, tone: "from-emerald-500 to-teal-500" },
    { label: "Open activities", value: pending.toLocaleString(), note: `${employees.length} active team members`, icon: CalendarClock, tone: "from-amber-500 to-orange-500" },
  ];

  return (
    <PageContainer>
      <div className="min-h-full space-y-6 bg-[#f8fafc] pb-12">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="relative p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-sky-100 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-violet-100 blur-3xl" />
            <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-sky-600">Revenue Hub</p>
                <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">CRM Command Center</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">A live view across customers, opportunities, activities and the sales team. Every number is driven by the same shared CRM state used by Opportunities, HR and Payroll.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="/customers" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50">Customers <ArrowUpRight size={16} /></a>
                <a href="/crm/opportunities" className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800">Open pipeline <ArrowUpRight size={16} /></a>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} whileHover={{ y: -4 }} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-lg">
                <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${card.tone} text-white shadow-sm`}><Icon size={20} /></div>
                <p className="text-sm font-semibold text-slate-500">{card.label}</p>
                <p className="mt-1 text-2xl font-black tracking-tight text-slate-950">{card.value}</p>
                <p className="mt-2 text-xs font-medium text-slate-400">{card.note}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div><h2 className="text-lg font-black text-slate-950">Revenue momentum</h2><p className="text-sm text-slate-500">Six-month revenue trend.</p></div>
              <div className="rounded-xl bg-emerald-50 px-3 py-2 text-right"><p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Current run rate</p><p className="text-sm font-black text-emerald-700">₦10.2m</p></div>
            </div>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
                  <defs><linearGradient id="crmRevenue" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#38bdf8" stopOpacity={0.35} /><stop offset="100%" stopColor="#38bdf8" stopOpacity={0.02} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} tickFormatter={(value) => `₦${value}m`} />
                  <Tooltip formatter={(value) => [`₦${value}m`, "Revenue"]} contentStyle={{ borderRadius: 14, borderColor: "#e2e8f0" }} />
                  <Area type="monotone" dataKey="revenue" stroke="#0284c7" strokeWidth={3} fill="url(#crmRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600"><Activity size={19} /></div><div><h2 className="font-black text-slate-950">Team pulse</h2><p className="text-xs text-slate-500">Live conversion signals</p></div></div>
            <div className="mt-6 space-y-3">
              {employees.map((employee) => {
                const won = opportunities.filter((item) => item.assignedTo === employee.id && item.stage === "won").length;
                const tasks = activities.filter((item) => item.assignedTo === employee.id && item.status === "pending").length;
                return <div key={employee.id} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-violet-500 text-sm font-black text-white">{employee.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-slate-800">{employee.name}</p><p className="truncate text-xs text-slate-500">{employee.position}</p></div><div className="text-right"><p className="text-sm font-black text-emerald-600">{won} won</p><p className="text-[11px] text-slate-400">{tasks} tasks</p></div></div>;
              })}
            </div>
          </section>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5"><Users className="text-sky-600" size={20} /><p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">Customer base</p><p className="mt-1 text-2xl font-black text-slate-950">{customers.length}</p><p className="mt-1 text-xs text-slate-500">Connected to the existing Customers module.</p></div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5"><Target className="text-violet-600" size={20} /><p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">Active deals</p><p className="mt-1 text-2xl font-black text-slate-950">{opportunities.filter((item) => !["won", "lost"].includes(item.stage)).length}</p><p className="mt-1 text-xs text-slate-500">Lead → meeting → proposal → close.</p></div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5"><Activity className="text-amber-600" size={20} /><p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">Activity queue</p><p className="mt-1 text-2xl font-black text-slate-950">{pending}</p><p className="mt-1 text-xs text-slate-500">Calls, meetings, emails and follow-ups.</p></div>
        </section>
      </div>
    </PageContainer>
  );
}
