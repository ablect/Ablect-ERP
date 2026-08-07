import Card
from "../../../components/ui/Card";

import {
  useTrialBalance,
} from "../hooks/useTrialBalance";

export default function TrialBalanceCard() {

  const report =
    useTrialBalance();

  return (

    <Card>

      <h2 className="text-lg font-semibold">

        Trial Balance

      </h2>

      <p>

        Debit:
        ₦
        {report.debit.toLocaleString()}

      </p>

      <p>

        Credit:
        ₦
        {report.credit.toLocaleString()}

      </p>

      <p>

        Status:
        {" "}
        {
          report.balanced
            ? "Balanced"
            : "Not Balanced"
        }

      </p>

    </Card>

  );

}