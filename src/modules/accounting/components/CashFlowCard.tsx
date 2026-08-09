import Card from "../../../components/ui/Card";
import { useCashFlow } from "../hooks/useCashFlow";

export default function CashFlowCard() {
  const { rows } = useCashFlow();
  const inflow = rows.reduce((sum, row) => sum + row.cashIn, 0);
  const outflow = rows.reduce((sum, row) => sum + row.cashOut, 0);
  const netCashFlow = rows.reduce((sum, row) => sum + row.netCash, 0);

  return (
    <Card>
      <h2 className="text-lg font-semibold">Cash Flow</h2>
      <p>Cash In: ₦{inflow.toLocaleString()}</p>
      <p>Cash Out: ₦{outflow.toLocaleString()}</p>
      <p>Net: ₦{netCashFlow.toLocaleString()}</p>
    </Card>
  );
}
