import Button
from "../../../components/ui/Button";

type Props = {

  onClick: () => void;

};

export default function DecreaseStockButton({

  onClick,

}: Props) {

  return (

    <Button onClick={onClick}>

      Decrease Stock

    </Button>

  );

}