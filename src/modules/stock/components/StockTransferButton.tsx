import Button
from "../../../components/ui/Button";

type Props = {

  onClick: () => void;

};

export default function StockTransferButton({

  onClick,

}: Props) {

  return (

    <Button onClick={onClick}>

      Transfer Stock

    </Button>

  );

}