import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  BarChart3,
  Boxes,
  Building2,
  ClipboardList,
  Clock3,
  DollarSign,
  Package,
  Plus,
  ShoppingCart,
  Sparkles,
  Target,
  Truck,
  UserRoundSearch,
  Users,
  Warehouse,
} from "lucide-react";

import { useAuth } from "../auth/AuthContext";
import { playUiSound } from "../utils/uiSound";
import "./Dashboard.css";

type DashboardModule = {
  title: string;
  desc: string;
  icon: LucideIcon;
  link: string;
  tone: "red" | "blue" | "green" | "amber" | "slate";
};

const modules: DashboardModule[] = [
  { title: "Sales", desc: "POS, invoices and customer orders", icon: ShoppingCart, link: "/sales", tone: "red" },
  { title: "Inventory", desc: "Stock levels and replenishment", icon: Warehouse, link: "/inventory", tone: "blue" },
  { title: "Products", desc: "Items, pricing and catalog", icon: Package, link: "/products", tone: "slate" },
  { title: "Customers", desc: "Customer records and history", icon: Users, link: "/customers", tone: "green" },
  { title: "Purchases", desc: "Orders and procurement workflow", icon: ClipboardList, link: "/purchases", tone: "amber" },
  { title: "Suppliers", desc: "Supplier records and management", icon: Truck, link: "/suppliers", tone: "blue" },
  { title: "Warehouse", desc: "Locations and warehouse control", icon: Building2, link: "/warehouse", tone: "slate" },
  { title: "Stock", desc: "Movements, adjustments and transfers", icon: Boxes, link: "/stock", tone: "green" },
  { title: "Reports", desc: "Business performance and analytics", icon: BarChart3, link: "/reports", tone: "blue" },
  { title: "CRM", desc: "Relationships and customer activity", icon: UserRoundSearch, link: "/crm", tone: "green" },
  { title: "Opportunities", desc: "Pipeline and sales opportunities", icon: Target, link: "/crm/opportunities", tone: "amber" },
  { title: "Users", desc: "System access and permissions", icon: Users, link: "/users", tone: "slate" },
  { title: "HR", desc: "Employees and workforce management", icon: Users, link: "/hr", tone: "slate" },
  { title: "Payroll", desc: "Salary processing and payroll", icon: DollarSign, link: "/payroll", tone: "green" },
];

const quickActions = [
  { title: "New Sale", desc: "Open the POS workspace", icon: ShoppingCart, link: "/sales" },
  { title: "Add Product", desc: "Create a catalog item", icon: Package, link: "/products" },
  { title: "Add Customer", desc: "Create a customer record", icon: Users, link: "/customers" },
  { title: "New Purchase", desc: "Start procurement", icon: ClipboardList, link: "/purchases" },
];

export default function Dashboard() {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] || "Administrator";

  function openWorkspace() {
    playUiSound("click");
  }

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div className="dashboard-hero-glow dashboard-hero-glow-one" />
        <div className="dashboard-hero-glow dashboard-hero-glow-two" />

        <div className="dashboard-hero-content">
          <div className="dashboard-kicker">
            <Sparkles size={14} /> Command centre
          </div>

          <h1>Good morning, {firstName}.</h1>
          <p>
            Your ABLECT Business Suite workspace is ready. Move between sales,
            inventory, customers and operations without leaving your workflow.
          </p>

          <div className="dashboard-hero-actions">
            <Link to="/sales" onClick={openWorkspace} className="dashboard-primary-action">
              <ShoppingCart size={17} /> Open Sales
              <ArrowUpRight size={16} />
            </Link>
            <Link to="/reports" onClick={openWorkspace} className="dashboard-secondary-action">
              View Reports
            </Link>
          </div>
        </div>

        <div className="dashboard-hero-status">
          <span className="dashboard-status-dot" />
          <div>
            <strong>Workspace online</strong>
            <span>All local modules available</span>
          </div>
        </div>
      </section>

      <section className="dashboard-stat-grid" aria-label="Business overview">
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon red"><ShoppingCart size={18} /></div>
          <div><span>Today&apos;s sales</span><strong>₦0</strong><small>Ready for your first transaction</small></div>
        </div>
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon blue"><Warehouse size={18} /></div>
          <div><span>Inventory</span><strong>0 items</strong><small>Stock workspace connected</small></div>
        </div>
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon green"><Users size={18} /></div>
          <div><span>Customers</span><strong>0</strong><small>Customer database ready</small></div>
        </div>
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon amber"><Clock3 size={18} /></div>
          <div><span>Pending work</span><strong>0</strong><small>No pending actions</small></div>
        </div>
      </section>

      <section className="dashboard-section dashboard-quick-section">
        <div className="dashboard-section-header">
          <div>
            <h2>Quick actions</h2>
            <p>Start common tasks without hunting through the navigation.</p>
          </div>
        </div>

        <div className="dashboard-quick-grid">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.title} to={action.link} onClick={openWorkspace} className="dashboard-quick-card">
                <span className="dashboard-quick-icon"><Icon size={18} /></span>
                <span><strong>{action.title}</strong><small>{action.desc}</small></span>
                <Plus size={16} />
              </Link>
            );
          })}
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
              <Link
                key={module.title}
                to={module.link}
                onClick={openWorkspace}
                className="dashboard-module-card"
              >
                <div>
                  <div className={`dashboard-module-icon ${module.tone}`}>
                    <Icon size={20} />
                  </div>
                  <div className="dashboard-module-copy">
                    <h3>{module.title}</h3>
                    <p>{module.desc}</p>
                  </div>
                </div>
                <ArrowUpRight size={17} className="dashboard-card-arrow" />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
