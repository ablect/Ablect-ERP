import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

// Dashboard
import Dashboard from "../pages/Dashboard";

// Inventory
import InventoryPage from "../modules/inventory/pages/InventoryPage";

// Sales
import SalesPage from "../modules/sales/pages/SalesPage";

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

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
      />
         <Route
          path="/inventory"
          element={
            <MainLayout>
              <InventoryPage />
            </MainLayout>
          }
        />

        <Route
          path="/products"
          element={
            <MainLayout>
              <ProductPage />
            </MainLayout>
          }
        />

        <Route
          path="/sales"
          element={
            <MainLayout>
              <SalesPage />
            </MainLayout>
          }
        />

        <Route
          path="/customers"
          element={
            <MainLayout>
              <CustomersPage />
            </MainLayout>
          }
        />

        <Route
          path="/suppliers"
          element={
            <MainLayout>
              <SuppliersPage />
            </MainLayout>
          }
        />

        <Route
          path="/reports"
          element={
            <MainLayout>
              <ReportsPage />
            </MainLayout>
          }
        />

        <Route
          path="/settings"
          element={
            <MainLayout>
              <SettingsPage />
            </MainLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}