import { create } from "zustand";

type ProductSelectionState = {

  selected: string[];

  toggle: (id: string) => void;

  clear: () => void;

};

export const useProductSelectionStore =
create<ProductSelectionState>((set, get) => ({

  selected: [],

  toggle(id) {

    const exists = get().selected.includes(id);

    if (exists) {

      set({

        selected: get().selected.filter(

          item => item !== id

        ),

      });

      return;

    }

    set({

      selected: [

        ...get().selected,

        id,

      ],

    });

  },

  clear() {

    set({

      selected: [],

    });

  },

}));