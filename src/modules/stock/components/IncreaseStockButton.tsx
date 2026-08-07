import Button
from "../../../components/ui/Button";

type Props = {

  onClick: () => void;

};

export default function IncreaseStockButton({

  onClick,

}: Props) {

  return (

    <Button onClick={onClick}>

      Increase Stock

    </Button>

  );

}