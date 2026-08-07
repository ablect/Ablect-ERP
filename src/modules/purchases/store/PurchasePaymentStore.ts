import { create } from "zustand";

import type { PurchasePayment }

from "../types/PurchasePayment";

type PurchasePaymentState = {

  payments: PurchasePayment[];

  setPayments: (

    payments: PurchasePayment[]

  ) => void;

  addPayment: (

    payment: PurchasePayment

  ) => void;

};

export const usePurchasePaymentStore =

create<PurchasePaymentState>((set, get) => ({

  payments: [],

  setPayments(payments) {

    set({ payments });

  },

  addPayment(payment) {

    set({

      payments: [

        ...get().payments,

        payment,

      ],

    });

  },

}));