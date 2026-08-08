import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BarChart3,
  Boxes,
  Building2,
  CalendarCheck,
  ChevronRight,
  ClipboardList,
  CreditCard,
  DollarSign,
  Package,
  Settings,
  ShoppingCart,
  Target,
  Truck,
  UserRoundSearch,
  Users,
  Warehouse,
} from "lucide-react";

type DashboardModule = {
  title: string;
  desc: string;
  icon: LucideIcon;
  link: string;
};

const modules: DashboardModule[] = [
  { title: "Sales & POS", desc: "Fast checkout and transactions", icon: ShoppingCart, link: "/sales" },
  { title: "Inventory", desc: "Stock, levels and movement", icon: Warehouse, link: "/inventory" },
  { title: "Products", desc: "Products, prices and categories", icon: Package, link: "/products" },
  { title: "Purchases", desc: "Purchase orders and receiving", icon: ClipboardList, link: "/purchases" },
  { title: "Customers", desc: "Customer database and accounts", icon: Users, link: "/customers" },
  { title: "Suppliers", desc: "Supplier management", icon: Truck, link: "/suppliers" },
  { title: "Warehouse", desc: "Locations and warehouse control", icon: Building2, link: "/warehouse" },
  { title: "Stock", desc: "Transfers and stock movements", icon: Boxes, link: "/stock" },
  { title: "CRM", desc: "Relationships and leads", icon: UserRoundSearch, link: "/crm" },
  { title: "Opportunities", desc: "Sales pipeline", icon: Target, link: "/crm/opportunities" },
  { title: "Activities", desc: "Calls, meetings and follow-ups", icon: CalendarCheck, link: "/crm/activities" },
  { title: "Reports", desc: "Business intelligence and reports", icon: BarChart3, link: "/reports" },
  { title: "Accounting", desc: "Finance and receivables", icon: CreditCard, link: "/accounting" },
  { title: "Payroll", desc: "Salary processing", icon: DollarSign, link: "/payroll" },
  { title: "HR", desc: "Employees and human resources", icon: Users, link: "/hr" },
  { title: "Users", desc: "System users and permissions", icon: Users, link: "/users" },
  { title: "Settings", desc: "Application configuration", icon: Settings, link: "/settings" },
];

export default function Dashboard() {
  return (
    <div className="min-h-full overflow-y-auto bg-[radial-gradient(circle_at_top_right,_rgba(15,23,42,0.07),_transparent_35%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px] space-y-7 pb-12">
        <section className="overflow-hidden rounded-[28px] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300/40 sm:p-8">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400"><Activity size={15} /> ABLECT BUSINESS SUITE</div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Business command centre</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">A connected workspace for sales, inventory, customers, finance, people and operations.</p>
            </div>
            <Link to="/sales" className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100">Open Sales POS<ChevronRight size={17} className="transition group-hover:translate-x-0.5" /></Link>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Workspace</p><p className="mt-2 text-2xl font-bold text-slate-900">17</p><p className="mt-1 text-xs text-slate-500">Connected modules</p></div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Navigation</p><p className="mt-2 text-2xl font-bold text-slate-900">Fluid</p><p className="mt-1 text-xs text-slate-500">Scroll and open modules without losing context</p></div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Mode</p><p className="mt-2 text-2xl font-bold text-emerald-600">Ready</p><p className="mt-1 text-xs text-slate-500">Module-driven ERP workspace</p></div>
        </section>

        <section>
          <div className="mb-4"><h2 className="text-xl font-bold text-slate-900">Modules</h2><p className="text-sm text-slate-500">Open a workspace and continue your workflow there.</p></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {modules.map((module) => {
              const Icon = module.icon;
              return <Link key={module.title} to={module.link} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"><div className="flex items-start justify-between gap-4"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition group-hover:bg-slate-900 group-hover:text-white"><Icon size={21} /></div><ChevronRight size={18} className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-700" /></div><h3 className="mt-5 font-bold text-slate-900">{module.title}</h3><p className="mt-1 text-sm leading-5 text-slate-500">{module.desc}</p></Link>;
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
