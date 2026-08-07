import StatCard

from "../../../components/ui/StatCard";

type Props = {

  balance: number;

};

export default function PurchaseBalanceCard({

  balance,

}: Props) {

  return (

    <StatCard

      title="Outstanding Payables"

      value={`₦${balance.toLocaleString()}`}

    />

  );

}