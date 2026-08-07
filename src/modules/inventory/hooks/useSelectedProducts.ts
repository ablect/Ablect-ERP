import {

useProductSelectionStore

}

from "../store/ProductSelectionStore";

import {

useProductStore

}

from "../store/ProductStore";

export function useSelectedProducts() {

  const {

    selected,

  } = useProductSelectionStore();

  const {

    products,

  } = useProductStore();

  return {

    products:

      products.filter(

        product =>

          selected.includes(

            product.id

          )

      ),

  };

}