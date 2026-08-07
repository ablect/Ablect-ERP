import Card from "../../../components/ui/Card";

type Props = {
  inflow: number;
  outflow: number;
};

export default function CashFlowHealthCard({
  inflow,
  outflow,
}: Props) {

  const balance = inflow - outflow;

  const healthy = balance >= 0;

  return (

    <Card className="rounded-2xl p-6">

      <h3 className="text-lg font-semibold">

        Cash Flow Health

      </h3>

      <div className="mt-6 space-y-4">

        <div className="flex justify-between">

          <span>Cash In</span>

          <strong className="text-green-600">

            ₦{inflow.toLocaleString()}

          </strong>

        </div>

        <div className="flex justify-between">

          <span>Cash Out</span>

          <strong className="text-red-600">

            ₦{outflow.toLocaleString()}

          </strong>

        </div>

        <hr />

        <div className="flex justify-between">

          <span>Net Cash</span>

          <strong className={healthy ? "text-green-600" : "text-red-600"}>

            ₦{balance.toLocaleString()}

          </strong>

        </div>

      </div>

    </Card>

  );

}