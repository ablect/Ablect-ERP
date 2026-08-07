import { useProductSelectionStore }
from "./ProductSelectionStore";

type Props = {

  id: string;

};

export default function ProductCheckbox({

  id,

}: Props) {

  const {

    selected,

    toggle,

  } = useProductSelectionStore();

  return (

    <input

      type="checkbox"

      checked={

        selected.includes(id)

      }

      onChange={() =>

        toggle(id)

      }

    />

  );

}