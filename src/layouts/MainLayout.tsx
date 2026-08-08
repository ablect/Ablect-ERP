import { useState, type ReactNode } from "react";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import "./MainLayout.css";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  function toggleSidebar() {
    if (window.innerWidth < 1024) {
      setMobileOpen((open) => !open);
      return;
    }

    setCollapsed((value) => !value);
  }

  function closeMobileSidebar() {
    if (window.innerWidth < 1024) {
      setMobileOpen(false);
    }
  }

  return (
    <div
      className={`layout ${collapsed ? "layout-collapsed" : ""} ${
        mobileOpen ? "layout-mobile-open" : ""
      }`}
    >
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onNavigate={closeMobileSidebar}
      />

      {mobileOpen && (
        <button
          type="button"
          className="layout-backdrop"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="layout-body">
        <Topbar onMenuClick={toggleSidebar} />

        <main className="layout-content">{children}</main>
      </div>
    </div>
  );
}
