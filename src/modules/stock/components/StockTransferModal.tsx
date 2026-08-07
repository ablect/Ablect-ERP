import { useState }
from "react";

import Card
from "../../../components/ui/Card";

import StockTransferForm
from "./StockTransferForm";

type Props = {

  open: boolean;

  onClose: () => void;

};

export default function StockTransferModal({

  open,

  onClose,

}: Props) {

  const [

    quantity,

    setQuantity,

  ] = useState(0);

  if (!open) {

    return null;

  }

  return (

    <Card>

      <h2 className="text-xl font-semibold">

        Stock Transfer

      </h2>

      <div className="mt-4">

        <StockTransferForm

          quantity={quantity}

          setQuantity={setQuantity}

          onSubmit={onClose}

        />

      </div>

    </Card>

  );

}