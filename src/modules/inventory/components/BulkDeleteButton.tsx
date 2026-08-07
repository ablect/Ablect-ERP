import Button from "../../../components/ui/Button";

import {

useProductSelectionStore

}

from "../store/ProductSelectionStore";

export default function BulkDeleteButton() {

  const {

    selected,

    clear,

  } = useProductSelectionStore();

  if (

    selected.length === 0

  ) {

    return null;

  }

  return (

    <Button

      onClick={clear}

    >

      Clear Selection

    </Button>

  );

}