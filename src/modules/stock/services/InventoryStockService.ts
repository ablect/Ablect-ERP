import { useInventoryStore }
from "../../inventory/store/InventoryStore";

export const inventoryStockService = {

  increase(

    productId: string,

    quantity: number,

  ) {

    const {

      products,

      setProducts,

    } = useInventoryStore.getState();

    const updated = products.map(product => {

      if (product.id !== productId) {

        return product;

      }

      return {

        ...product,

        quantity:

          product.quantity +

          quantity,

      };

    });

    setProducts(updated);

  },

  decrease(

    productId: string,

    quantity: number,

  ) {

    const {

      products,

      setProducts,

    } = useInventoryStore.getState();

    const updated = products.map(product => {

      if (product.id !== productId) {

        return product;

      }

      return {

        ...product,

        quantity: Math.max(

          0,

          product.quantity -

          quantity,

        ),

      };

    });

    setProducts(updated);

  },

};