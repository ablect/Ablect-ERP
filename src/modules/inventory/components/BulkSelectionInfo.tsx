import {

useProductSelectionStore

}

from "../store/ProductSelectionStore";

export default function BulkSelectionInfo() {

  const {

    selected,

  } = useProductSelectionStore();

  if (

    selected.length === 0

  ) {

    return null;

  }

  return (

    <div className="rounded-lg bg-blue-50 p-4">

      {selected.length}

      {" "}products selected

    </div>

  );

}