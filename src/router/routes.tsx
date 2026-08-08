import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import type { ReactNode } from "react";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../auth/ProtectedRoute";
import LoginPage from "../pages/LoginPage";

import Dashboard from "../pages/Dashboard";
import ProductPage from "../pages/ProductPage";
import CustomersPage from "../pages/Customers";
import SuppliersPage from "../pages/Suppliers";
import ReportsPage from "../pages/Reports";
import SettingsPage from "../pages/Settings";

import InventoryPage from "../modules/inventory/pages/InventoryPage";
import SalesPage from "../modules/sales/pages/SalesPage";
import PurchasePage from "../modules/purchases/pages/PurchasePage";
import GoodsReceivedNotePage from "../modules/purchases/pages/GoodsReceivedNotePage";
import PurchaseRequisitionPage from "../modules/purchases/pages/PurchaseRequisitionPage";
import WarehousePage from "../modules/warehouse/pages/WarehousePage";
import PayrollPage from "../modules/payroll/components/PayrollPage";
import StockMovementPage from "../modules/stock/pages/StockMovementPage";
import CRMDashboardPage from "../modules/crm/pages/CRMDashboardPage";
import OpportunityPage from "../modules/crm/pages/OpportunityPage";
import UserPage from "../modules/users/pages/UserPage";
import EmployeePage from "../modules/hr/pages/EmployeePage";

function ProtectedPage({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <MainLayout>{children}</MainLayout>
    </ProtectedRoute>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<ProtectedPage><Dashboard /></ProtectedPage>} />
        <Route path="/inventory" element={<ProtectedPage><InventoryPage /></ProtectedPage>} />
        <Route path="/products" element={<ProtectedPage><ProductPage /></ProtectedPage>} />
        <Route path="/sales" element={<ProtectedPage><SalesPage /></ProtectedPage>} />
        <Route path="/purchases" element={<ProtectedPage><PurchasePage /></ProtectedPage>} />
        <Route path="/purchases/goods-received" element={<ProtectedPage><GoodsReceivedNotePage /></ProtectedPage>} />
        <Route path="/purchases/requisitions" element={<ProtectedPage><PurchaseRequisitionPage /></ProtectedPage>} />
        <Route path="/customers" element={<ProtectedPage><CustomersPage /></ProtectedPage>} />
        <Route path="/suppliers" element={<ProtectedPage><SuppliersPage /></ProtectedPage>} />
        <Route path="/warehouse" element={<ProtectedPage><WarehousePage /></ProtectedPage>} />
        <Route path="/stock" element={<ProtectedPage><StockMovementPage /></ProtectedPage>} />
        <Route path="/reports" element={<ProtectedPage><ReportsPage /></ProtectedPage>} />
        <Route path="/settings" element={<ProtectedPage><SettingsPage /></ProtectedPage>} />
        <Route path="/crm" element={<ProtectedPage><CRMDashboardPage /></ProtectedPage>} />
        <Route path="/crm/opportunities" element={<ProtectedPage><OpportunityPage /></ProtectedPage>} />
        <Route path="/users" element={<ProtectedPage><UserPage /></ProtectedPage>} />
        <Route path="/hr" element={<ProtectedPage><EmployeePage /></ProtectedPage>} />
        <Route path="/payroll" element={<ProtectedPage><PayrollPage /></ProtectedPage>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
