import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SaleMode = "Walk-in" | "Table #" | "Room #" | "Online";
export type PaymentMethod = "Cash" | "Transfer" | "POS" | "Wallet" | "Split Payment";

export type CartItem = {
  productId: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  stockQty: number;
  discountPercent: number;
  notes: string;
  modifiers: string[];
};

type SalesCartState = {
  items: CartItem[];
  saleMode: SaleMode;
  saleReference: string;
  customerId: string | null;
  paymentMethod: PaymentMethod;
  heldSales: CartItem[][];
  addItem: (item: Omit<CartItem, "quantity" | "discountPercent" | "notes" | "modifiers">) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateItem: (productId: string, patch: Partial<CartItem>) => void;
  removeItem: (productId: string) => void;
  reorderItems: (from: number, to: number) => void;
  setSaleMode: (saleMode: SaleMode) => void;
  setSaleReference: (value: string) => void;
  setCustomerId: (customerId: string | null) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  holdSale: () => void;
  recallSale: () => void;
  clearCart: () => void;
};

export const useSalesCartStore = create<SalesCartState>()(
  persist(
    (set) => ({
      items: [],
      saleMode: "Walk-in",
      saleReference: "",
      customerId: null,
      paymentMethod: "Cash",
      heldSales: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((entry) => entry.productId === item.productId);
          if (existing) {
            return {
              items: state.items.map((entry) =>
                entry.productId === item.productId
                  ? { ...entry, quantity: Math.min(entry.quantity + 1, entry.stockQty) }
                  : entry,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              { ...item, quantity: 1, discountPercent: 0, notes: "", modifiers: [] },
            ],
          };
        }),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.productId === productId
                ? { ...item, quantity: Math.max(0, Math.min(quantity, item.stockQty)) }
                : item,
            )
            .filter((item) => item.quantity > 0),
        })),

      updateItem: (productId, patch) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, ...patch } : item,
          ),
        })),

      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((item) => item.productId !== productId) })),

      reorderItems: (from, to) =>
        set((state) => {
          if (from === to || from < 0 || to < 0 || from >= state.items.length || to >= state.items.length) {
            return state;
          }
          const items = [...state.items];
          const [moved] = items.splice(from, 1);
          items.splice(to, 0, moved);
          return { items };
        }),

      setSaleMode: (saleMode) => set({ saleMode }),
      setSaleReference: (saleReference) => set({ saleReference }),
      setCustomerId: (customerId) => set({ customerId }),
      setPaymentMethod: (paymentMethod) => set({ paymentMethod }),

      holdSale: () =>
        set((state) => ({
          heldSales: state.items.length ? [...state.heldSales, state.items] : state.heldSales,
          items: [],
          customerId: null,
          saleReference: "",
        })),

      recallSale: () =>
        set((state) => {
          if (!state.heldSales.length) return state;
          const items = state.heldSales[state.heldSales.length - 1];
          return {
            ...state,
            items,
            heldSales: state.heldSales.slice(0, -1),
          };
        }),

      clearCart: () => set({ items: [], customerId: null, saleReference: "" }),
    }),
    {
      name: "ablect-erp-sales-cart",
      partialize: (state) => ({
        items: state.items,
        saleMode: state.saleMode,
        saleReference: state.saleReference,
        customerId: state.customerId,
        paymentMethod: state.paymentMethod,
        heldSales: state.heldSales,
      }),
    },
  ),
);
