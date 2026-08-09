import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../auth/ProtectedRoute";
import { useAuth } from "../auth/AuthContext";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import ProductPage from "../pages/ProductPage";
import ProductDashboard from "../components/products/ProductDashboard";
import CustomersPage from "../pages/Customers";
import SuppliersPage from "../pages/Suppliers";
import LegacyReportsPage from "../pages/Reports";
import LegacySettingsPage from "../pages/Settings";
import InventoryPage from "../modules/inventory/pages/InventoryPage";
import SalesPage from "../modules/sales/pages/SalesPage";
import PurchasePage from "../modules/purchases/pages/PurchasePage";
import GoodsReceivedNotePage from "../modules/purchases/pages/GoodsReceivedNotePage";
import PurchaseRequisitionPage from "../modules/purchases/pages/PurchaseRequisitionPage";
import WarehousePage from "../modules/warehouse/pages/WarehousePage";
import PayrollPage from "../modules/payroll/pages/PayrollPage";
import StockMovementPage from "../modules/stock/pages/StockMovementPage";
import CRMDashboardPage from "../modules/crm/pages/CRMDashboardPage";
import OpportunityPage from "../modules/crm/pages/OpportunityPage";
import ActivityPage from "../modules/crm/pages/ActivityPage";
import LegacyUserPage from "../modules/users/pages/UserPage";
import EmployeePage from "../modules/hr/pages/EmployeePage";
import UsersPage from "../features/Admin/pages/UsersPage";
import ReportsPage from "../features/Analytics/pages/ReportsPage";
import SettingsPage from "../features/Admin/pages/SettingsPage";
import HRCommandCenterPage from "../features/HR/pages/HRCommandCenterPage";

const moduleForPath = (pathname: string) => {
  if (pathname === "/") return "dashboard";
  const first = pathname.split("/").filter(Boolean)[0];
  const aliases: Record<string,string> = { products:"products", inventory:"inventory", sales:"sales", purchases:"purchases", customers:"customers", suppliers:"suppliers", warehouse:"warehouse", stock:"inventory", reports:"reports", settings:"settings", crm:"crm", users:"users", hr:"hr", payroll:"payroll" };
  return aliases[first] ?? "dashboard";
};

function AccessDenied({ module }: { module: string }) {
  return <div className="grid min-h-[60vh] place-items-center p-8"><div className="max-w-md rounded-3xl border border-rose-100 bg-white p-8 text-center shadow-sm"><div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-rose-50 text-rose-600">!</div><h1 className="mt-4 text-2xl font-black text-slate-900">Access restricted</h1><p className="mt-2 text-sm leading-6 text-slate-500">Your role does not have permission to view the {module} workspace. Ask an administrator to update your role permissions.</p></div></div>;
}

function ProtectedPage({ children }: { children: ReactNode }) {
  const { can } = useAuth(); const location = useLocation(); const module = moduleForPath(location.pathname);
  return <ProtectedRoute><MainLayout>{can(module) ? children : <AccessDenied module={module} />}</MainLayout></ProtectedRoute>;
}

export default function AppRouter(){return <BrowserRouter><Routes>
  <Route path="/login" element={<LoginPage/>}/><Route path="/" element={<ProtectedPage><Dashboard/></ProtectedPage>}/><Route path="/inventory" element={<ProtectedPage><InventoryPage/></ProtectedPage>}/><Route path="/products" element={<ProtectedPage><ProductDashboard/></ProtectedPage>}/><Route path="/products/legacy" element={<ProtectedPage><ProductPage/></ProtectedPage>}/><Route path="/sales" element={<ProtectedPage><SalesPage/></ProtectedPage>}/><Route path="/purchases" element={<ProtectedPage><PurchasePage/></ProtectedPage>}/><Route path="/purchases/goods-received" element={<ProtectedPage><GoodsReceivedNotePage/></ProtectedPage>}/><Route path="/purchases/requisitions" element={<ProtectedPage><PurchaseRequisitionPage/></ProtectedPage>}/><Route path="/customers" element={<ProtectedPage><CustomersPage/></ProtectedPage>}/><Route path="/suppliers" element={<ProtectedPage><SuppliersPage/></ProtectedPage>}/><Route path="/warehouse" element={<ProtectedPage><WarehousePage/></ProtectedPage>}/><Route path="/stock" element={<ProtectedPage><StockMovementPage/></ProtectedPage>}/><Route path="/reports" element={<ProtectedPage><ReportsPage/></ProtectedPage>}/><Route path="/reports/legacy" element={<ProtectedPage><LegacyReportsPage/></ProtectedPage>}/><Route path="/settings" element={<ProtectedPage><SettingsPage/></ProtectedPage>}/><Route path="/settings/legacy" element={<ProtectedPage><LegacySettingsPage/></ProtectedPage>}/><Route path="/crm" element={<ProtectedPage><CRMDashboardPage/></ProtectedPage>}/><Route path="/crm/opportunities" element={<ProtectedPage><OpportunityPage/></ProtectedPage>}/><Route path="/crm/activities" element={<ProtectedPage><ActivityPage/></ProtectedPage>}/><Route path="/users" element={<ProtectedPage><UsersPage/></ProtectedPage>}/><Route path="/users/legacy" element={<ProtectedPage><LegacyUserPage/></ProtectedPage>}/><Route path="/hr" element={<ProtectedPage><HRCommandCenterPage/></ProtectedPage>}/><Route path="/hr/legacy" element={<ProtectedPage><EmployeePage/></ProtectedPage>}/><Route path="/payroll" element={<ProtectedPage><PayrollPage/></ProtectedPage>}/><Route path="*" element={<Navigate to="/" replace/>}/>
</Routes></BrowserRouter>;}
