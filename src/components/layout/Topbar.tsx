import { useState, type FormEvent, type ReactNode } from "react";
import { Bell, ChevronDown, Menu, Search, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import InventoryPage from "../../modules/inventory/pages/InventoryPage";
import EmployeePage from "../../modules/hr/pages/EmployeePage";
import ReportsPage from "../../pages/Reports";
import SettingsPage from "../../pages/Settings";
import "./Topbar.css";

type Props = { onMenuClick: () => void };
type DrawerTab = "Inventory" | "HR" | "Reports" | "Settings" | null;

const pageNames: Record<string, string> = {
  "/": "Dashboard", "/sales": "Sales", "/inventory": "Inventory", "/products": "Products", "/customers": "Customers", "/purchases": "Purchases", "/purchases/goods-received": "Goods Received", "/purchases/requisitions": "Purchase Requisitions", "/warehouse": "Warehouse", "/stock": "Stock Movements", "/suppliers": "Suppliers", "/crm": "CRM", "/crm/opportunities": "Opportunities", "/crm/activities": "Activities", "/hr": "Human Resources", "/payroll": "Payroll", "/users": "Users", "/reports": "Reports", "/settings": "Settings",
};

function Drawer({ tab, onClose }: { tab: Exclude<DrawerTab, null>; onClose: () => void }) {
  const content: Record<Exclude<DrawerTab, null>, ReactNode> = {
    Inventory: <InventoryPage />, HR: <EmployeePage />, Reports: <ReportsPage />, Settings: <SettingsPage />,
  };
  return <div className="fixed inset-0 z-[100] bg-slate-950/30 backdrop-blur-[1px]" onMouseDown={onClose}>
    <aside className="absolute right-0 top-0 h-full w-full max-w-3xl overflow-y-auto bg-slate-50 shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/95 px-5 py-4 backdrop-blur"><div><div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">ABLECT ERP</div><h2 className="text-lg font-bold">{tab}</h2></div><button type="button" onClick={onClose} className="rounded-xl border p-2"><X size={18} /></button></div>
      <div className="p-5">{content[tab]}</div>
    </aside>
  </div>;
}

export default function Topbar({ onMenuClick }: Props) {
  const { user, logout } = useAuth(); const navigate = useNavigate(); const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false); const [profileOpen, setProfileOpen] = useState(false); const [query, setQuery] = useState(""); const [drawer, setDrawer] = useState<DrawerTab>(null);
  const pageName = location.pathname === "/sales" ? "Sales" : pageNames[location.pathname] ?? "Workspace"; const initial = user?.name?.charAt(0).toUpperCase() ?? "A";
  function handleLogout() { logout(); navigate("/login", { replace: true }); }
  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const normalized = query.trim().toLowerCase(); if (!normalized) return; const match = Object.entries(pageNames).find(([path, name]) => `${name} ${path}`.toLowerCase().includes(normalized)); if (match) { navigate(match[0]); setQuery(""); setSearchOpen(false); } }
  const salesNav = location.pathname === "/sales";

  return <>
    <header className="topbar">
      <div className="topbar-left"><button type="button" className="topbar-icon-button topbar-menu" onClick={onMenuClick} aria-label="Toggle navigation"><Menu size={21} /></button><div className="topbar-heading"><span>ABLECT BUSINESS SUITE</span><h1>{pageName}</h1></div></div>
      {salesNav && <nav className="hidden items-center gap-1 rounded-xl bg-slate-100 p-1 lg:flex" aria-label="Sales workspace navigation"><button type="button" className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-slate-900 shadow-sm">Sales</button>{(["Inventory", "HR", "Reports", "Settings"] as const).map((tab) => <button key={tab} type="button" onClick={() => setDrawer(tab)} className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-white hover:text-slate-900">{tab}</button>)}</nav>}
      <div className="topbar-right">
        {searchOpen ? <form className="topbar-search" onSubmit={handleSearchSubmit}><Search size={18} /><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder={salesNav ? "Scan barcode / search..." : "Search workspace..."} aria-label="Search workspace" /><button type="button" onClick={() => { setSearchOpen(false); setQuery(""); }} aria-label="Close search"><X size={17} /></button></form> : <button type="button" className="topbar-icon-button" onClick={() => setSearchOpen(true)} aria-label="Search"><Search size={20} /></button>}
        <button type="button" className="topbar-icon-button topbar-notification" aria-label="Notifications"><Bell size={20} /><span /></button>
        <div className="topbar-profile-wrap"><button type="button" className="topbar-profile" onClick={() => setProfileOpen((open) => !open)} aria-expanded={profileOpen}><span className="topbar-avatar">{initial}</span><span className="topbar-user-copy"><strong>{user?.name ?? "Administrator"}</strong><small>{user?.role ?? "Administrator"}</small></span><ChevronDown size={16} /></button>{profileOpen && <div className="topbar-profile-menu"><div className="profile-menu-header"><strong>{user?.name}</strong><span>{user?.email}</span></div><button type="button" onClick={() => { setProfileOpen(false); salesNav ? setDrawer("Settings") : navigate("/settings"); }}>Account & Settings</button><button type="button" className="danger" onClick={handleLogout}>Sign out</button></div>}</div>
      </div>
    </header>
    {drawer && salesNav && <Drawer tab={drawer} onClose={() => setDrawer(null)} />}
  </>;
}
