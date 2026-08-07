import Button
from "../../../components/ui/Button";

type Props = {

  label: string;

  onClick: () => void;

};

export default function ExportButton({

  label,

  onClick,

}: Props) {

  return (

    <Button

      onClick={onClick}

    >

      {label}

    </Button>

  );

}