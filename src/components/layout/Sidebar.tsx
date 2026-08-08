import { NavLink } from "react-router-dom";
import {
  BarChart3,
  Boxes,
  Briefcase,
  Building2,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  DollarSign,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Target,
  Truck,
  UserCog,
  UserRoundSearch,
  Users,
  Warehouse,
} from "lucide-react";

import { playUiSound } from "../../utils/uiSound";
import "./Sidebar.css";

type Props = {
  collapsed: boolean;
  mobileOpen: boolean;
  onNavigate: () => void;
  onToggle: () => void;
};

type NavItem = {
  label: string;
  to: string;
  icon: typeof LayoutDashboard;
};

const primaryItems: NavItem[] = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Sales", to: "/sales", icon: ShoppingCart },
  { label: "Inventory", to: "/inventory", icon: Warehouse },
  { label: "Products", to: "/products", icon: Package },
  { label: "Customers", to: "/customers", icon: Users },
  { label: "Purchases", to: "/purchases", icon: ClipboardList },
];

const operationsItems: NavItem[] = [
  { label: "Warehouse", to: "/warehouse", icon: Building2 },
  { label: "Stock Movements", to: "/stock", icon: Boxes },
  { label: "Suppliers", to: "/suppliers", icon: Truck },
];

const businessItems: NavItem[] = [
  { label: "CRM", to: "/crm", icon: UserRoundSearch },
  { label: "Opportunities", to: "/crm/opportunities", icon: Target },
  { label: "Activities", to: "/crm/activities", icon: CalendarCheck },
  { label: "HR", to: "/hr", icon: Briefcase },
  { label: "Payroll", to: "/payroll", icon: DollarSign },
  { label: "Users", to: "/users", icon: UserCog },
];

function NavigationGroup({
  items,
  collapsed,
  onNavigate,
}: {
  items: NavItem[];
  collapsed: boolean;
  onNavigate: () => void;
}) {
  return (
    <nav className="sidebar-nav">
      {items.map(({ label, to, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          title={collapsed ? label : undefined}
          onClick={() => {
            playUiSound("click");
            onNavigate();
          }}
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <Icon size={19} strokeWidth={2} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default function Sidebar({
  collapsed,
  mobileOpen,
  onNavigate,
  onToggle,
}: Props) {
  return (
    <aside
      className={`sidebar ${collapsed ? "sidebar-collapsed" : ""} ${
        mobileOpen ? "sidebar-mobile-open" : ""
      }`}
    >
      <div className="sidebar-brand">
        <div className="sidebar-logo">A</div>
        <div className="sidebar-brand-copy">
          <strong>ABLECT</strong>
          <span>Business Suite</span>
        </div>
      </div>

      <div className="sidebar-scroll">
        <div className="sidebar-section-label">Workspace</div>
        <NavigationGroup items={primaryItems} collapsed={collapsed} onNavigate={onNavigate} />

        <div className="sidebar-section-label">Operations</div>
        <NavigationGroup items={operationsItems} collapsed={collapsed} onNavigate={onNavigate} />

        <div className="sidebar-section-label">Business</div>
        <NavigationGroup items={businessItems} collapsed={collapsed} onNavigate={onNavigate} />

        <div className="sidebar-section-label">Analytics</div>
        <nav className="sidebar-nav">
          <NavLink
            to="/reports"
            title={collapsed ? "Reports" : undefined}
            onClick={() => {
              playUiSound("click");
              onNavigate();
            }}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <BarChart3 size={19} strokeWidth={2} />
            <span>Reports</span>
          </NavLink>
        </nav>
      </div>

      <div className="sidebar-footer">
        <NavLink
          to="/settings"
          title={collapsed ? "Settings" : undefined}
          onClick={() => {
            playUiSound("click");
            onNavigate();
          }}
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <Settings size={19} strokeWidth={2} />
          <span>Settings</span>
        </NavLink>

        <button
          type="button"
          className="sidebar-collapse"
          onClick={() => {
            playUiSound("click");
            onToggle();
          }}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
