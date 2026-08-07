import Button
from "../../../components/ui/Button";

type Props = {

  onClick: () => void;

};

export default function StockAdjustmentButton({

  onClick,

}: Props) {

  return (

    <Button onClick={onClick}>

      Adjust Stock

    </Button>

  );

}