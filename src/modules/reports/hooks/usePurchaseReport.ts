import { usePurchaseStore }
from "../../purchases/store/PurchaseStore";

export function usePurchaseReport() {

  const {

    purchases,

  } = usePurchaseStore();

  const total = purchases.reduce(

    (sum, purchase) =>

      sum + purchase.totalAmount,

    0,

  );

  return {

    total,

  };

}