import Button
from "../../../components/ui/Button";

import Input
from "../../../components/ui/Input";

type Props = {

  quantity: number;

  setQuantity: (value: number) => void;

  onSubmit: () => void;

};

export default function StockTransferForm({

  quantity,

  setQuantity,

  onSubmit,

}: Props) {

  return (

    <div className="space-y-4">

      <Input

        placeholder="Quantity"

        value={String(quantity)}

        onChange={(e) =>

          setQuantity(

            Number(e.target.value)

          )

        }

      />

      <Button

        onClick={onSubmit}

      >

        Transfer

      </Button>

    </div>

  );

}