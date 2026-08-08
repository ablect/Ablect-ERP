import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import InventoryPage from "../modules/inventory/pages/InventoryPage";

import EmployeePage from "../modules/hr/pages/EmployeePage";

import AttendancePage from "../modules/hr/pages/AttendancePage";

import DepartmentPage from "../modules/hr/pages/DepartmentPage";

import LeavePage from "../modules/hr/pages/LeavePage";

import PositionPage from "../modules/hr/pages/PositionPage";

import ApplicantPage from "../modules/hr/pages/ApplicantPage";

import InterviewPage from "../modules/hr/pages/InterviewPage";

import TrainingPage from "../modules/hr/pages/TrainingPage";

import OnboardingPage from "../modules/hr/pages/OnboardingPage";

import EmployeeAssetPage from "../modules/hr/pages/EmployeeAssetPage";

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

        <Route
          path="/hr/employees"
          element={
            <MainLayout>
              <EmployeePage />
            </MainLayout>
          }
        />

        <Route
          path="/hr/attendance"
          element={
            <MainLayout>
              <AttendancePage />
            </MainLayout>
          }
        />

        <Route
          path="/hr/departments"
          element={
            <MainLayout>
              <DepartmentPage />
            </MainLayout>
          }
        />

        <Route
          path="/hr/leave"
          element={
            <MainLayout>
              <LeavePage />
            </MainLayout>
          }
        />

        <Route
          path="/hr/positions"
          element={
            <MainLayout>
              <PositionPage />
            </MainLayout>
          }
        />

        <Route
          path="/hr/applicants"
          element={
            <MainLayout>
              <ApplicantPage />
            </MainLayout>
          }
        />

        <Route
          path="/hr/interviews"
          element={
            <MainLayout>
              <InterviewPage />
            </MainLayout>
          }
        />

        <Route
          path="/hr/training"
          element={
            <MainLayout>
              <TrainingPage />
            </MainLayout>
          }
        />

        <Route
          path="/hr/onboarding"
          element={
            <MainLayout>
              <OnboardingPage />
            </MainLayout>
          }
        />

        <Route
          path="/hr/assets"
          element={
            <MainLayout>
              <EmployeeAssetPage />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}