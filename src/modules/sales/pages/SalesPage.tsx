import { useState } from "react";

import SectionTitle from "../../../components/ui/SectionTitle";

import SalesOverview from "../components/SalesOverview";
import NewSaleButton from "../components/NewSaleButton";
import EmptySales from "../components/EmptySales";
import SaleForm from "../components/SaleForm";
import SalesTable from "../components/SalesTable";

import { useSales } from "../hooks/useSales";

export default function SalesPage() {
  const [showForm, setShowForm] =
    useState(false);

  const { sales } = useSales();

  return (
    <div className="space-y-8">
      <SectionTitle
        title="Sales"
        subtitle="Manage all customer sales."
      />

      <SalesOverview />

      <div className="flex justify-end">
        <NewSaleButton
          onClick={() =>
            setShowForm(true)
          }
        />
      </div>

      {showForm && (
        <SaleForm />
      )}

      {sales.length === 0 ? (
        <EmptySales />
      ) : (
        <SalesTable sales={sales} />
      )}
    </div>
  );
}
