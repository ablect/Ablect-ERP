import SectionTitle from "../../../components/ui/SectionTitle";

import SalesOverview from "../components/SalesOverview";
import NewSaleButton from "../components/NewSaleButton";
import EmptySales from "../components/EmptySales";

export default function SalesPage() {

  return (

    <div className="space-y-8">

      <SectionTitle
        title="Sales"
        subtitle="Manage all customer sales."
      />

      <SalesOverview />

      <NewSaleButton />

      <EmptySales />

    </div>

  );

}