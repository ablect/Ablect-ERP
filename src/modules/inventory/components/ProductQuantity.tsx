type Props = {

  quantity: number;

};

export default function ProductQuantity({

  quantity,

}: Props) {

  return (

    <span className="font-medium">

      {quantity}

    </span>

  );

}