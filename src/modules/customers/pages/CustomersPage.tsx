import { useState } from "react";

import SectionTitle from "../../../components/ui/SectionTitle";

import CustomerForm from "../components/CustomerForm";
import CustomerTable from "../components/CustomerTable";

export default function CustomersPage() {
  const [showForm, setShowForm] =
    useState(false);

  return (
    <div className="space-y-8">
      <SectionTitle
        title="Customers"
        subtitle="Manage your customers and customer information."
      />

      <div className="flex justify-end">
        <button
          type="button"
          className="rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800"
          onClick={() =>
            setShowForm(
              (current) => !current,
            )
          }
        >
          {showForm
            ? "Close"
            : "New Customer"}
        </button>
      </div>

      {showForm && (
        <CustomerForm
          onCreated={() =>
            setShowForm(false)
          }
        />
      )}

      <CustomerTable />
    </div>
  );
}