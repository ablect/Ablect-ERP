import Pagination from "../../../components/ui/Pagination";

import {

usePaginationStore

}

from "../store/PaginationStore";

export default function ProductPagination() {

  const {

    page,

    next,

    previous,

  } = usePaginationStore();

  return (

    <Pagination

      page={page}

      totalPages={1}

      onPrevious={previous}

      onNext={next}

    />

  );

}