import { useState, type FormEvent } from "react";
import { Bell, ChevronDown, Menu, Search, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import "./Topbar.css";

type Props = {
  onMenuClick: () => void;
};

const pageNames: Record<string, string> = {
  "/": "Dashboard",
  "/sales": "Sales",
  "/inventory": "Inventory",
  "/products": "Products",
  "/customers": "Customers",
  "/purchases": "Purchases",
  "/purchases/goods-received": "Goods Received",
  "/purchases/requisitions": "Purchase Requisitions",
  "/warehouse": "Warehouse",
  "/stock": "Stock Movements",
  "/suppliers": "Suppliers",
  "/crm": "CRM",
  "/crm/opportunities": "Opportunities",
  "/crm/activities": "Activities",
  "/hr": "Human Resources",
  "/payroll": "Payroll",
  "/users": "Users",
  "/reports": "Reports",
  "/settings": "Settings",
};

export default function Topbar({ onMenuClick }: Props) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [query, setQuery] = useState("");

  const pageName = pageNames[location.pathname] ?? "Workspace";
  const initial = user?.name?.charAt(0).toUpperCase() ?? "A";

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = query.trim().toLowerCase();

    if (!normalized) return;

    const match = Object.entries(pageNames).find(([path, name]) =>
      `${name} ${path}`.toLowerCase().includes(normalized),
    );

    if (match) {
      navigate(match[0]);
      setQuery("");
      setSearchOpen(false);
    }
  }

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="topbar-icon-button topbar-menu"
          onClick={onMenuClick}
          aria-label="Toggle navigation"
        >
          <Menu size={21} />
        </button>

        <div className="topbar-heading">
          <span>ABLECT BUSINESS SUITE</span>
          <h1>{pageName}</h1>
        </div>
      </div>

      <div className="topbar-right">
        {searchOpen ? (
          <form className="topbar-search" onSubmit={handleSearchSubmit}>
            <Search size={18} />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search workspace..."
              aria-label="Search workspace"
            />
            <button
              type="button"
              onClick={() => {
                setSearchOpen(false);
                setQuery("");
              }}
              aria-label="Close search"
            >
              <X size={17} />
            </button>
          </form>
        ) : (
          <button
            type="button"
            className="topbar-icon-button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        )}

        <button
          type="button"
          className="topbar-icon-button topbar-notification"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span />
        </button>

        <div className="topbar-profile-wrap">
          <button
            type="button"
            className="topbar-profile"
            onClick={() => setProfileOpen((open) => !open)}
            aria-expanded={profileOpen}
          >
            <span className="topbar-avatar">{initial}</span>
            <span className="topbar-user-copy">
              <strong>{user?.name ?? "Administrator"}</strong>
              <small>{user?.role ?? "Administrator"}</small>
            </span>
            <ChevronDown size={16} />
          </button>

          {profileOpen && (
            <div className="topbar-profile-menu">
              <div className="profile-menu-header">
                <strong>{user?.name}</strong>
                <span>{user?.email}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/settings");
                }}
              >
                Account & Settings
              </button>
              <button type="button" className="danger" onClick={handleLogout}>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
