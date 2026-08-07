import PurchaseBalanceCard
from "./PurchaseBalanceCard";

import PurchasePaymentCard
from "./PurchasePaymentCard";

type Props = {
  balance: number;
};

export default function PurchaseSummaryCards({
  balance,
}: Props) {

  return (

    <div className="grid gap-4 md:grid-cols-2">

      <PurchaseBalanceCard
        balance={balance}
      />

      <PurchasePaymentCard />

    </div>

  );

}