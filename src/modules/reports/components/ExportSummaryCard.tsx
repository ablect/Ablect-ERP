import Card
from "../../../components/ui/Card";

export default function ExportSummaryCard() {

  return (

    <Card>

      <h2 className="text-lg font-semibold">

        Export Summary

      </h2>

      <ul className="mt-4 space-y-2">

        <li>✓ CSV Export</li>

        <li>✓ Excel Export</li>

        <li>✓ PDF Export</li>

      </ul>

    </Card>

  );

}