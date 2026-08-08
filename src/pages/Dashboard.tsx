import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Building2,
  CalendarCheck,
  ClipboardList,
  CreditCard,
  DollarSign,
  Package,
  Settings,
  ShoppingCart,
  Sparkles,
  Target,
  Truck,
  UserRoundSearch,
  Users,
  Warehouse,
} from "lucide-react";
import "./Dashboard.css";

type DashboardModule = {
  title: string;
  desc: string;
  icon: LucideIcon;
  link: string;
};

const modules: DashboardModule[] = [
  { title: "Sales", desc: "POS, invoices and customer orders", icon: ShoppingCart, link: "/sales" },
  { title: "Inventory", desc: "Stock levels and replenishment", icon: Warehouse, link: "/inventory" },
  { title: "Products", desc: "Items, pricing and catalog", icon: Package, link: "/products" },
  { title: "Customers", desc: "Customer records and history", icon: Users, link: "/customers" },
  { title: "Purchases", desc: "Orders and procurement workflow", icon: ClipboardList, link: "/purchases" },
  { title: "Suppliers", desc: "Supplier records and management", icon: Truck, link: "/suppliers" },
  { title: "Warehouse", desc: "Locations and warehouse control", icon: Building2, link: "/warehouse" },
  { title: "Stock", desc: "Movements, adjustments and transfers", icon: Boxes, link: "/stock" },
  { title: "Reports", desc: "Business performance and analytics", icon: BarChart3, link: "/reports" },
  { title: "CRM", desc: "Relationships and customer activity", icon: UserRoundSearch, link: "/crm" },
  { title: "Opportunities", desc: "Pipeline and sales opportunities", icon: Target, link: "/crm/opportunities" },
  { title: "Activities", desc: "Calls, meetings and follow-ups", icon: CalendarCheck, link: "/crm/activities" },
  { title: "Users", desc: "System access and permissions", icon: Users, link: "/users" },
  { title: "HR", desc: "Employees and workforce management", icon: Users, link: "/hr" },
  { title: "Payroll", desc: "Salary processing and payroll", icon: DollarSign, link: "/payroll" },
  { title: "Accounting", desc: "Finance and accounting workspace", icon: CreditCard, link: "/accounting" },
  { title: "Settings", desc: "Configure your business suite", icon: Settings, link: "/settings" },
];

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div className="dashboard-hero-orb" />
        <div className="dashboard-hero-content">
          <div className="dashboard-kicker">
            <Sparkles size={14} /> Command centre
          </div>
          <h1>Run your business from one workspace.</h1>
          <p>
            ABLECT Business Suite connects sales, inventory, purchasing, customers,
            people and reporting in a single fluid desktop experience.
          </p>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <h2>Business modules</h2>
            <p>Open a workspace and continue without losing your place.</p>
          </div>
        </div>

        <div className="dashboard-module-grid">
          {modules.map((module) => {
            const Icon = module.icon;

            return (
              <Link key={module.title} to={module.link} className="dashboard-module-card">
                <div>
                  <div className="dashboard-module-icon">
                    <Icon size={20} />
                  </div>
                  <div style={{ marginTop: 14 }}>
                    <h3>{module.title}</h3>
                    <p>{module.desc}</p>
                  </div>
                </div>
                <ArrowRight size={17} className="dashboard-card-arrow" />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
