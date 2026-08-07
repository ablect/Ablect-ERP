import Card
from "../../../components/ui/Card";

import ExportToolbar
from "./ExportToolbar";

export default function ReportActionsCard() {

  return (

    <Card>

      <h2 className="text-lg font-semibold">

        Report Actions

      </h2>

      <div className="mt-4">

        <ExportToolbar />

      </div>

    </Card>

  );

}