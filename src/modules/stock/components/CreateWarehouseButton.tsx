import Button
from "../../../components/ui/Button";

type Props = {

  onClick: () => void;

};

export default function CreateWarehouseButton({

  onClick,

}: Props) {

  return (

    <Button onClick={onClick}>

      New Warehouse

    </Button>

  );

}