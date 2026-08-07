import { create } from "zustand";

type PaginationState = {

  page: number;

  setPage: (page: number) => void;

  next: () => void;

  previous: () => void;

};

export const usePaginationStore =
create<PaginationState>((set, get) => ({

  page: 1,

  setPage(page) {

    set({ page });

  },

  next() {

    set({

      page: get().page + 1,

    });

  },

  previous() {

    if (get().page <= 1) return;

    set({

      page: get().page - 1,

    });

  },

}));