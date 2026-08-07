import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import InventoryPage from "../modules/inventory/pages/InventoryPage";

export default function AppRouter() {

  return (

    <BrowserRouter>

      <Routes>

        <Route

          path="/"

          element={

            <MainLayout>

              <InventoryPage />

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

      </Routes>

    </BrowserRouter>

  );

}