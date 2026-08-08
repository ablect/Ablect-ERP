import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

// Dashboard
import Dashboard from "../pages/Dashboard";

// Products
import ProductPage from "../pages/ProductPage";

// Customers
import CustomersPage from "../pages/Customers";

// Suppliers
import SuppliersPage from "../pages/Suppliers";

// Reports
import ReportsPage from "../pages/Reports";

// Settings
import SettingsPage from "../pages/Settings";

// Inventory
import InventoryPage from "../modules/inventory/pages/InventoryPage";

// Sales
import SalesPage from "../modules/sales/pages/SalesPage";

// Purchases
import PurchasePage from "../modules/purchases/pages/PurchasePage";
import GoodsReceivedNotePage from "../modules/purchases/pages/GoodsReceivedNotePage";
import PurchaseRequisitionPage from "../modules/purchases/pages/PurchaseRequisitionPage";

// Warehouse
import WarehousePage from "../modules/warehouse/pages/WarehousePage";

// Stock
import PayrollPage from "../modules/payroll/components/PayrollPage";
import StockMovementPage from "../modules/stock/pages/StockMovementPage";

// CRM
import CRMDashboardPage from "../modules/crm/pages/CRMDashboardPage";
import OpportunityPage from "../modules/crm/pages/OpportunityPage";
import UserPage from "../modules/users/pages/UserPage";
import EmployeePage from "../modules/hr/pages/EmployeePage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
{/* Payroll */}
<Route
  path="/payroll"
  element={
    <MainLayout>
      <PayrollPage />
    </MainLayout>
  }
/>
{/* Users */}
<Route
  path="/users"
  element={
    <MainLayout>
      <UserPage />
    </MainLayout>
  }
/>

{/* HR */}
<Route
  path="/hr"
  element={
    <MainLayout>
      <EmployeePage />
    </MainLayout>
  }
/>
        {/* Dashboard */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />

        {/* Inventory */}
        <Route
          path="/inventory"
          element={
            <MainLayout>
              <InventoryPage />
            </MainLayout>
          }
        />

        {/* Products */}
        <Route
          path="/products"
          element={
            <MainLayout>
              <ProductPage />
            </MainLayout>
          }
        />

        {/* Sales */}
        <Route
          path="/sales"
          element={
            <MainLayout>
              <SalesPage />
            </MainLayout>
          }
        />

        {/* Purchases */}
        <Route
          path="/purchases"
          element={
            <MainLayout>
              <PurchasePage />
            </MainLayout>
          }
        />

        <Route
          path="/purchases/goods-received"
          element={
            <MainLayout>
              <GoodsReceivedNotePage />
            </MainLayout>
          }
        />

        <Route
          path="/purchases/requisitions"
          element={
            <MainLayout>
              <PurchaseRequisitionPage />
            </MainLayout>
          }
        />

        {/* Customers */}
        <Route
          path="/customers"
          element={
            <MainLayout>
              <CustomersPage />
            </MainLayout>
          }
        />

        {/* Suppliers */}
        <Route
          path="/suppliers"
          element={
            <MainLayout>
              <SuppliersPage />
            </MainLayout>
          }
        />

        {/* Warehouse */}
        <Route
          path="/warehouse"
          element={
            <MainLayout>
              <WarehousePage />
            </MainLayout>
          }
        />

        {/* Stock */}
        <Route
          path="/stock"
          element={
            <MainLayout>
              <StockMovementPage />
            </MainLayout>
          }
        />

        {/* Reports */}
        <Route
          path="/reports"
          element={
            <MainLayout>
              <ReportsPage />
            </MainLayout>
          }
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={
            <MainLayout>
              <SettingsPage />
            </MainLayout>
          }
        />

        {/* CRM */}
        <Route
          path="/crm"
          element={
            <MainLayout>
              <CRMDashboardPage />
            </MainLayout>
          }
        />

        <Route
          path="/crm/opportunities"
          element={
            <MainLayout>
              <OpportunityPage />
            </MainLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}