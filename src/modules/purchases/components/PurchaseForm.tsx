import Form from "../../../components/ui/Form";
import Button from "../../../components/ui/Button";

import { usePurchaseCalculator } from "../hooks/usePurchaseCalculator";
import PurchaseTotals from "./PurchaseTotals";
import PurchaseItems from "./PurchaseItems";
import { usePurchaseForm } from "../hooks/usePurchaseForm";
import { createPurchase } from "../utils/createPurchase";
import { purchaseService } from "../services/PurchaseService";
import PurchaseBasicInformation from "./PurchaseBasicInformation";

export default function PurchaseForm() {
  const form = usePurchaseForm();

  const items = form.watch("items");

  const { subtotal } =
    usePurchaseCalculator(items);

  async function submit(data: any) {
    const purchase = createPurchase(data);

    await purchaseService.create(purchase);

    form.reset();
  }

  return (
    <Form
      onSubmit={form.handleSubmit(submit)}
    >
      <PurchaseBasicInformation
        register={form.register}
      />

      <PurchaseItems
        register={form.register}
        watch={form.watch}
        setValue={form.setValue}
      />

      <PurchaseTotals
        total={subtotal}
      />

      <Button type="submit">
        Save Purchase
      </Button>
    </Form>
  );
}