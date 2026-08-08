import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

import {
  Package,
  Warehouse,
  ShoppingCart,
  Truck,
  BarChart3,
  Settings,
  Users,
  Boxes,
  Building2,
  ClipboardList,
  DollarSign,
  CreditCard,
  UserRoundSearch,
  Target,
  CalendarCheck,
} from "lucide-react";

type DashboardModule = {
  title: string;
  desc: string;
  icon: LucideIcon;
  link: string;
};

const modules: DashboardModule[] = [
  {
    title: "Inventory",
    desc: "Products, Brands, Categories",
    icon: Warehouse,
    link: "/inventory",
  },
  {
    title: "Products",
    desc: "Manage Products",
    icon: Package,
    link: "/products",
  },
  {
    title: "Sales",
    desc: "Sales & POS",
    icon: ShoppingCart,
    link: "/sales",
  },
  {
    title: "Purchases",
    desc: "Purchase Orders",
    icon: ClipboardList,
    link: "/purchases",
  },
  {
    title: "Suppliers",
    desc: "Supplier Management",
    icon: Truck,
    link: "/suppliers",
  },
  {
    title: "Customers",
    desc: "Customer Database",
    icon: Users,
    link: "/customers",
  },
  {
    title: "Warehouse",
    desc: "Warehouse Control",
    icon: Building2,
    link: "/warehouse",
  },
  {
    title: "Stock",
    desc: "Stock Transfers",
    icon: Boxes,
    link: "/stock",
  },
  {
    title: "Reports",
    desc: "Business Reports",
    icon: BarChart3,
    link: "/reports",
  },
  {
    title: "HR",
    desc: "Human Resources",
    icon: Users,
    link: "/hr",
  },
  {
    title: "Payroll",
    desc: "Salary Processing",
    icon: DollarSign,
    link: "/payroll",
  },
  {
    title: "Accounting",
    desc: "Finance",
    icon: CreditCard,
    link: "/accounting",
  },
  {
    title: "CRM",
    desc: "Customer Relationship Management",
    icon: UserRoundSearch,
    link: "/crm",
  },
  {
    title: "Opportunities",
    desc: "Sales Pipeline",
    icon: Target,
    link: "/crm/opportunities",
  },
  {
    title: "Activities",
    desc: "Calls, Meetings & Follow-ups",
    icon: CalendarCheck,
    link: "/crm/activities",
  },
  {
    title: "Settings",
    desc: "Application Settings",
    icon: Settings,
    link: "/settings",
  },
  {
  title: "Users",
  desc: "System User Management",
  icon: Users,
  link: "/users",
},
{
  title: "HR",
  desc: "Human Resources",
  icon: Users,
  link: "/hr",
},
{
  title: "Payroll",
  desc: "Salary Processing",
  icon: DollarSign,
  link: "/payroll",
},
];

export default function Dashboard() {
  return (
    <div style={{ padding: 30 }}>
      <h1>ABLECT BUSINESS SUITE ERP</h1>

      <p style={{ color: "#666", marginBottom: 30 }}>
        Business Management Dashboard
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
          gap: 20,
        }}
      >
        {modules.map((module) => {
          const Icon = module.icon;

          return (
            <Link
              key={module.title}
              to={module.link}
              style={{
                textDecoration: "none",
                color: "#222",
                background: "#fff",
                borderRadius: 12,
                padding: 24,
                border: "1px solid #e5e7eb",
                transition: "0.2s",
              }}
            >
              <Icon size={34} />

              <h2>{module.title}</h2>

              <p>{module.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}  