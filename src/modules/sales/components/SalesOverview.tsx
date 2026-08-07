import SalesSummaryCard from "./SalesSummaryCard";

export default function SalesOverview() {

  return (

    <div className="grid gap-4 md:grid-cols-4">

      <SalesSummaryCard

        title="Today's Sales"

        value="₦0"

      />

      <SalesSummaryCard

        title="Orders"

        value={0}

      />

      <SalesSummaryCard

        title="Completed"

        value={0}

      />

      <SalesSummaryCard

        title="Pending"

        value={0}

      />

    </div>

  );

}