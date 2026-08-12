import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, ready } = useAuth();
  const location = useLocation();
  if (!ready) return <div className="grid min-h-screen place-items-center bg-[#f8fafc] text-sm font-semibold text-slate-500">Loading secure workspace…</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <>{children}</>;
}
