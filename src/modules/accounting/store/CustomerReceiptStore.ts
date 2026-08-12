import { create } from "zustand";
import type { CustomerReceipt } from "../types/CustomerReceipt";

type CustomerReceiptState = {
  receipts: CustomerReceipt[];
  setReceipts: (receipts: CustomerReceipt[]) => void;
};

export const useCustomerReceiptStore = create<CustomerReceiptState>((set) => ({
  receipts: [],
  setReceipts: (receipts) => set({ receipts }),
}));
