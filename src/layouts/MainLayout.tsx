import type { ReactNode } from "react";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import "./MainLayout.css";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="layout">
      <Sidebar />

      <div className="layout-body">
        <Topbar />

        <main className="layout-content">
          {children}
        </main>
      </div>
    </div>
  );
}