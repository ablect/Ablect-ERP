import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

type Props = {
  amount: number;
  setAmount: (value: number) => void;
  onSubmit: () => void;
};

export default function PurchasePaymentForm({
  amount,
  setAmount,
  onSubmit,
}: Props) {
  return (
    <div className="space-y-4">

      <Input
        placeholder="Payment Amount"
        value={String(amount)}
        onChange={(e) =>
          setAmount(Number(e.target.value))
        }
      />

      <Button onClick={onSubmit}>
        Save Payment
      </Button>

    </div>
  );
}