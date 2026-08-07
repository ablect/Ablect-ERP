import StatCard

from "../../../components/ui/StatCard";

type Props = {

  value: number;

};

export default function PurchaseStatusCard({

  value,

}: Props) {

  return (

    <StatCard

      title="Draft Purchases"

      value={value}

    />

  );

}