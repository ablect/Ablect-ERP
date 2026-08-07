import { create } from "zustand";

type ProductDetailsState = {

  selectedProductId: string | null;

  open: boolean;

  openProduct: (id: string) => void;

  close: () => void;

};

export const useProductDetailsStore =
create<ProductDetailsState>((set) => ({

  selectedProductId: null,

  open: false,

  openProduct(id) {

    set({

      selectedProductId: id,

      open: true,

    });

  },

  close() {

    set({

      selectedProductId: null,

      open: false,

    });

  },

}));