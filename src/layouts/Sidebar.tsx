import {
  LayoutDashboard,
  Package,
  Warehouse,
  ShoppingCart,
  Users,
  Truck,
  BarChart3,
  Settings,
  Building2,
  BadgeDollarSign,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import "./Sidebar.css";

const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Products",
    icon: Package,
    path: "/products",
  },
  {
    title: "Inventory",
    icon: Warehouse,
    path: "/inventory",
  },
  {
    title: "Sales",
    icon: ShoppingCart,
    path: "/sales",
  },
  {
    title: "Customers",
    icon: Users,
    path: "/customers",
  },
  {
    title: "Suppliers",
    icon: Truck,
    path: "/suppliers",
  },
  {
    title: "Human Resources",
    icon: Building2,
    path: "/hr/employees",
  },
  {
    title: "Payroll",
    icon: BadgeDollarSign,
    path: "/payroll",
  },
  {
    title: "Reports",
    icon: BarChart3,
    path: "/reports",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>ABLECT ERP</h2>
      </div>

      <nav>

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <Icon size={19} />

              <span>{item.title}</span>
            </NavLink>
          );
        })}

      </nav>
    </aside>
  );
}