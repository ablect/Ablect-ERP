import { useEffect, useMemo, useState } from "react";
import {
  Barcode,
  ChevronRight,
  CreditCard,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";

import { inventoryService } from "../../inventory/services/InventoryService";
import { useInventoryStore } from "../../inventory/store/InventoryStore";
import { useCustomers } from "../../customers/hooks/useCustomers";
import { saleItemService } from "../services/SaleItemService";
import { salePaymentService } from "../services/SalePaymentService";
import { saleService } from "../services/SaleService";
import type { SalePaymentMethod } from "../types/SalePayment";
import { createSaleItem } from "../utils/createSaleItem";
import { completeSale } from "../utils/completeSale";
import { useSalesStore } from "../store/SalesStore";
import type { InventoryItem } from "../../inventory/types/InventoryItem";

const paymentMethods: SalePaymentMethod[] = [
  "Cash",
  "Card",
  "Bank Transfer",
  "POS",
  "Mobile Money",
  "Cheque",
  "Credit",
];

type CartLine = {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
};

type PaymentLine = {
  id: string;
  method: SalePaymentMethod;
  amount: number;
  reference: string;
};

type Transaction = {
  id: string;
  invoiceNumber: string;
  customerId: string;
  items: CartLine[];
  discountPercent: number;
  taxPercent: number;
  payments: PaymentLine[];
};

function money(value: number) {
  return `₦${Math.max(0, value).toLocaleString()}`;
}

function playUiClick() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextClass) return;

    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = 520;
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.025, context.currentTime + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.055);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.06);
  } catch {
    // Audio feedback must never block checkout.
  }
}

function createTransaction(index: number): Transaction {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return {
    id: crypto.randomUUID(),
    invoiceNumber: `INV-${date}-${String(index).padStart(3, "0")}`,
    customerId: "",
    items: [],
    discountPercent: 0,
    taxPercent: 0,
    payments: [
      {
        id: crypto.randomUUID(),
        method: "Cash",
        amount: 0,
        reference: "",
      },
    ],
  };
}

export default function ModernSalesPOS() {
  const { customers } = useCustomers();
  const setSales = useSalesStore((state) => state.setSales);
  const setInventory = useInventoryStore((state) => state.setItems);

  const [products, setProducts] = useState<InventoryItem[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>(() => [createTransaction(1)]);
  const [activeId, setActiveId] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showPayment, setShowPayment] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historySearch, setHistorySearch] = useState("");
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);
  const [sales, setLocalSales] = useState<Awaited<ReturnType<typeof saleService.getAll>>>([]);

  const active = transactions.find((transaction) => transaction.id === activeId) ?? transactions[0];

  useEffect(() => {
    if (!activeId && transactions[0]) setActiveId(transactions[0].id);
  }, [activeId, transactions]);

  async function loadCatalog() {
    const data = await inventoryService.getAll();
    setProducts(data);
    setInventory(data);
  }

  async function loadSales() {
    const data = await saleService.getAll();
    setLocalSales(data);
    setSales(data);
  }

  useEffect(() => {
    void loadCatalog();
    void loadSales();
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((product) => product.category).filter(Boolean)))],
    [products],
  );

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesSearch =
        !query ||
        product.itemName.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.id.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [category, products, search]);

  const subtotal = active?.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0) ?? 0;
  const discountAmount = subtotal * ((active?.discountPercent ?? 0) / 100);
  const taxable = Math.max(0, subtotal - discountAmount);
  const taxAmount = taxable * ((active?.taxPercent ?? 0) / 100);
  const grandTotal = Math.max(0, taxable + taxAmount);
  const amountPaid = active?.payments.reduce((sum, payment) => sum + Math.max(0, payment.amount), 0) ?? 0;
  const balanceDue = Math.max(0, grandTotal - amountPaid);
  const changeDue = Math.max(0, amountPaid - grandTotal);

  const completedSales = sales.filter((sale) => sale.status === "Completed");
  const today = new Date().toISOString().slice(0, 10);
  const todaySales = completedSales.filter((sale) => sale.date === today).reduce((sum, sale) => sum + sale.total, 0);

  const lastSeven = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const key = date.toISOString().slice(0, 10);
    return {
      key,
      label: date.toLocaleDateString(undefined, { weekday: "short" }),
      value: completedSales.filter((sale) => sale.date === key).reduce((sum, sale) => sum + sale.total, 0),
    };
  });
  const maxChart = Math.max(...lastSeven.map((item) => item.value), 1);

  const filteredHistory = sales.filter((sale) => {
    const query = historySearch.trim().toLowerCase();
    return !query || sale.invoiceNumber.toLowerCase().includes(query) || sale.customerId.toLowerCase().includes(query);
  });

  function updateActive(updater: (transaction: Transaction) => Transaction) {
    if (!active) return;
    setTransactions((current) => current.map((transaction) => transaction.id === active.id ? updater(transaction) : transaction));
  }

  function addProduct(product: InventoryItem) {
    playUiClick();
    if (product.quantity <= 0) {
      setMessage(`${product.itemName} is out of stock.`);
      return;
    }
    updateActive((transaction) => {
      const existing = transaction.items.find((item) => item.productId === product.id);
      if (existing) {
        return {
          ...transaction,
          items: transaction.items.map((item) => item.productId === product.id ? { ...item, quantity: Math.min(item.quantity + 1, product.quantity) } : item),
        };
      }
      return {
        ...transaction,
        items: [...transaction.items, { id: crypto.randomUUID(), productId: product.id, quantity: 1, unitPrice: product.sellingPrice }],
      };
    });
    setMessage("");
  }

  function changeQuantity(lineId: string, delta: number) {
    playUiClick();
    updateActive((transaction) => ({
      ...transaction,
      items: transaction.items.map((item) => item.id === lineId ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item).filter((item) => item.quantity > 0),
    }));
  }

  function addTransaction() {
    playUiClick();
    const next = createTransaction(transactions.length + 1);
    setTransactions((current) => [...current, next]);
    setActiveId(next.id);
    setMessage("");
  }

  function removeTransaction(id: string) {
    setTransactions((current) => {
      const next = current.filter((transaction) => transaction.id !== id);
      if (!next.length) {
        const fresh = createTransaction(1);
        setActiveId(fresh.id);
        return [fresh];
      }
      if (id === activeId) setActiveId(next[0].id);
      return next;
    });
  }

  function addPayment() {
    updateActive((transaction) => ({
      ...transaction,
      payments: [...transaction.payments, { id: crypto.randomUUID(), method: "Cash", amount: Math.max(0, grandTotal - amountPaid), reference: "" }],
    }));
  }

  function updatePayment(id: string, patch: Partial<PaymentLine>) {
    updateActive((transaction) => ({
      ...transaction,
      payments: transaction.payments.map((payment) => payment.id === id ? { ...payment, ...patch } : payment),
    }));
  }

  function removePayment(id: string) {
    updateActive((transaction) => ({
      ...transaction,
      payments: transaction.payments.length === 1 ? transaction.payments : transaction.payments.filter((payment) => payment.id !== id),
    }));
  }

  async function completeCurrentSale() {
    if (!active) return;
    setMessage("");
    if (!active.customerId) {
      setMessage("Select a customer before completing the sale. Use the customer field for a walk-in record if configured.");
      return;
    }
    if (!active.items.length) {
      setMessage("Add at least one product to the cart.");
      return;
    }

    const creditOnly = active.payments.every((payment) => payment.method === "Credit");
    if (!creditOnly && amountPaid + 0.005 < grandTotal) {
      setMessage(`Payment is short by ${money(grandTotal - amountPaid)}.`);
      return;
    }

    for (const line of active.items) {
      const product = products.find((item) => item.id === line.productId);
      if (!product) {
        setMessage("One of the selected products no longer exists in inventory.");
        return;
      }
      if (line.quantity > product.quantity) {
        setMessage(`${product.itemName} only has ${product.quantity} unit(s) available.`);
        return;
      }
    }

    try {
      setProcessing(true);
      const now = new Date().toISOString();
      const saleId = crypto.randomUUID();
      const sale = {
        id: saleId,
        invoiceNumber: active.invoiceNumber,
        customerId: active.customerId,
        date: today,
        subtotal,
        discountAmount,
        taxAmount,
        total: grandTotal,
        amountPaid,
        balanceDue,
        paymentStatus: balanceDue <= 0 ? "Paid" as const : amountPaid > 0 ? "Partially Paid" as const : "Unpaid" as const,
        paymentMethod: active.payments.map((payment) => payment.method).join(" + "),
        status: "Draft" as const,
      };

      await saleService.create(sale);
      const saleItems = active.items.map((line) => createSaleItem(saleId, line.productId, line.quantity, line.unitPrice));
      await saleItemService.createMany(saleItems);
      await completeSale(saleId);

      await salePaymentService.createMany(
        active.payments.filter((payment) => payment.amount > 0).map((payment) => ({
          id: crypto.randomUUID(),
          saleId,
          method: payment.method,
          amount: payment.amount,
          reference: payment.reference.trim() || undefined,
          createdAt: now,
        })),
      );

      await loadCatalog();
      await loadSales();
      removeTransaction(active.id);
      setShowPayment(false);
      setShowDiscount(false);
      setMessage(`Sale ${active.invoiceNumber} completed successfully.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to complete sale.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="min-h-full space-y-5 pb-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400"><ShoppingCart size={14} /> Sales workspace</div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Sales & POS</h1>
          <p className="mt-1 text-sm text-slate-500">Fast checkout, live stock control and auditable transactions.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => { playUiClick(); setShowHistory(true); }} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">Sales history</button>
          <button onClick={() => { playUiClick(); void loadCatalog(); }} className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800">Refresh stock</button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Today", money(todaySales), "Completed sales today"],
          ["Orders", String(sales.length), "All recorded invoices"],
          ["Open carts", String(transactions.length), "Active transactions"],
          ["Outstanding", money(sales.reduce((sum, sale) => sum + (sale.balanceDue ?? 0), 0)), "Customer balances"],
        ].map(([label, value, hint]) => <div key={label} className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p><p className="mt-2 text-2xl font-bold text-slate-900">{value}</p><p className="mt-1 text-xs text-slate-500">{hint}</p></div>)}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(380px,0.85fr)]">
        <section className="min-h-[620px] rounded-3xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-4"><div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"><div className="flex items-center gap-2 overflow-x-auto pb-1">{transactions.map((transaction, index) => <button key={transaction.id} onClick={() => { playUiClick(); setActiveId(transaction.id); }} className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition ${transaction.id === active?.id ? "bg-slate-900 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>Order {index + 1}{transaction.items.length > 0 && <span className="rounded-full bg-white/15 px-1.5 py-0.5">{transaction.items.length}</span>}</button>)}<button onClick={addTransaction} className="flex shrink-0 items-center gap-1 rounded-xl border border-dashed border-slate-300 px-3 py-2 text-xs font-semibold text-slate-500 hover:border-slate-500 hover:text-slate-900"><Plus size={14} /> New order</button></div><div className="text-xs text-slate-400">Invoice: <span className="font-semibold text-slate-700">{active?.invoiceNumber}</span></div></div></div>
          <div className="p-4">
            <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && filteredProducts[0]) addProduct(filteredProducts[0]); }} placeholder="Search product, SKU or scan barcode..." className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-12 text-sm outline-none transition focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100" autoFocus /><Barcode className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={19} /></div>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">{categories.map((item) => <button key={item} onClick={() => { playUiClick(); setCategory(item); }} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition ${category === item ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{item}</button>)}</div>
            <div className="mt-4 grid max-h-[475px] grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product) => <button key={product.id} onClick={() => addProduct(product)} className="group rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50" disabled={product.quantity <= 0}><div className="flex h-24 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 via-white to-slate-200 text-slate-300 transition group-hover:from-slate-200 group-hover:text-slate-500"><ShoppingCart size={28} /></div><p className="mt-3 line-clamp-2 text-sm font-semibold text-slate-800">{product.itemName}</p><p className="mt-1 text-xs text-slate-400">{product.sku} · {product.unit}</p><div className="mt-2 flex items-center justify-between gap-2"><span className="font-bold text-slate-900">{money(product.sellingPrice)}</span><span className={`text-[11px] font-semibold ${product.quantity <= product.reorderLevel ? "text-amber-600" : "text-emerald-600"}`}>{product.quantity} left</span></div></button>)}
              {filteredProducts.length === 0 && <div className="col-span-full rounded-2xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500">No products match this search. Add products in Inventory, then refresh stock.</div>}
            </div>
          </div>
        </section>

        <section className="flex min-h-[620px] flex-col rounded-3xl border border-slate-200/80 bg-slate-950 text-white shadow-xl shadow-slate-200/40">
          <div className="border-b border-white/10 p-4"><div className="flex items-center justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Current cart</p><h2 className="mt-1 text-xl font-bold">{active?.invoiceNumber}</h2></div><button onClick={() => removeTransaction(active?.id ?? "")} className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"><Trash2 size={18} /></button></div></div>
          <div className="flex-1 overflow-y-auto p-4"><div className="space-y-2">
            {active?.items.map((line) => { const product = products.find((item) => item.id === line.productId); return <div key={line.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate text-sm font-semibold">{product?.itemName ?? "Unknown product"}</p><p className="mt-1 text-xs text-slate-400">{money(line.unitPrice)} · {product?.unit ?? "unit"}</p></div><p className="font-bold">{money(line.quantity * line.unitPrice)}</p></div><div className="mt-3 flex items-center justify-between"><div className="flex items-center gap-2 rounded-xl bg-white/5 p-1"><button onClick={() => changeQuantity(line.id, -1)} className="rounded-lg p-1.5 hover:bg-white/10"><Minus size={14} /></button><span className="min-w-7 text-center text-sm font-semibold">{line.quantity}</span><button onClick={() => changeQuantity(line.id, 1)} className="rounded-lg p-1.5 hover:bg-white/10"><Plus size={14} /></button></div><button onClick={() => updateActive((transaction) => ({ ...transaction, items: transaction.items.filter((item) => item.id !== line.id) }))} className="text-xs font-semibold text-slate-400 hover:text-red-300">Remove</button></div></div>; })}
            {!active?.items.length && <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center"><ShoppingCart className="mx-auto text-slate-500" /><p className="mt-3 text-sm font-semibold text-slate-300">Cart is ready</p><p className="mt-1 text-xs text-slate-500">Select a product to start this transaction.</p></div>}
          </div></div>
          <div className="border-t border-white/10 p-4"><div className="mb-4 flex items-center justify-between gap-2"><div className="flex min-w-0 items-center gap-2"><UserRound size={17} className="shrink-0 text-slate-400" /><select value={active?.customerId ?? ""} onChange={(event) => updateActive((transaction) => ({ ...transaction, customerId: event.target.value }))} className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-white outline-none"><option value="" className="text-slate-900">Select customer</option>{customers.map((customer) => <option key={customer.id} value={customer.id} className="text-slate-900">{customer.name}</option>)}</select></div><button onClick={() => { playUiClick(); setShowDiscount(true); }} className="rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10">Discount</button></div><div className="space-y-2 text-sm"><div className="flex justify-between text-slate-400"><span>Subtotal</span><span>{money(subtotal)}</span></div><div className="flex justify-between text-slate-400"><span>Discount</span><span>-{money(discountAmount)}</span></div><div className="flex justify-between text-slate-400"><span>Tax</span><span>{money(taxAmount)}</span></div><div className="mt-3 flex items-end justify-between border-t border-white/10 pt-3"><span className="text-slate-300">Total</span><span className="text-3xl font-bold">{money(grandTotal)}</span></div></div><button disabled={processing || !active?.items.length} onClick={() => { playUiClick(); setShowPayment(true); }} className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"><WalletCards size={18} /> Continue to payment</button></div>
        </section>
      </div>

      <section className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]"><div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><div><h2 className="text-lg font-bold text-slate-900">Sales pulse</h2><p className="text-xs text-slate-500">Completed sales over the last seven days.</p></div><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Live</span></div><div className="mt-5 flex h-40 items-end gap-3">{lastSeven.map((item) => <div key={item.key} className="flex h-full flex-1 flex-col items-center justify-end gap-2"><div className="w-full rounded-t-xl bg-gradient-to-t from-slate-900 to-slate-500 transition hover:from-slate-700" style={{ height: `${Math.max(8, (item.value / maxChart) * 100)}%` }} title={money(item.value)} /><span className="text-[11px] font-medium text-slate-400">{item.label}</span></div>)}</div></div><div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm"><h2 className="text-lg font-bold text-slate-900">Cashier controls</h2><div className="mt-4 grid grid-cols-2 gap-2 text-xs font-semibold"><button onClick={addTransaction} className="rounded-xl bg-slate-100 px-3 py-3 text-slate-700 hover:bg-slate-200">New order</button><button onClick={() => setShowHistory(true)} className="rounded-xl bg-slate-100 px-3 py-3 text-slate-700 hover:bg-slate-200">Find invoice</button><button onClick={() => setShowDiscount(true)} className="rounded-xl bg-slate-100 px-3 py-3 text-slate-700 hover:bg-slate-200">Order discount</button><button onClick={() => setMessage("Scanner ready. Focus the product search and scan a SKU/barcode.")} className="rounded-xl bg-slate-100 px-3 py-3 text-slate-700 hover:bg-slate-200">Scanner ready</button></div>{message && <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-medium text-slate-600">{message}</div>}</div></section>

      {showDiscount && active && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm" onMouseDown={() => setShowDiscount(false)}><div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl" onMouseDown={(event) => event.stopPropagation()}><div className="flex items-center justify-between"><div><h2 className="text-xl font-bold">Order adjustments</h2><p className="text-sm text-slate-500">Apply the discount once at order level.</p></div><button onClick={() => setShowDiscount(false)}><X /></button></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-slate-700">Discount %<input type="number" min="0" max="100" value={active.discountPercent} onChange={(event) => updateActive((transaction) => ({ ...transaction, discountPercent: Math.min(100, Math.max(0, Number(event.target.value))) }))} className="mt-2 w-full rounded-xl border p-3 font-normal" /></label><label className="text-sm font-semibold text-slate-700">Tax %<input type="number" min="0" max="100" value={active.taxPercent} onChange={(event) => updateActive((transaction) => ({ ...transaction, taxPercent: Math.min(100, Math.max(0, Number(event.target.value))) }))} className="mt-2 w-full rounded-xl border p-3 font-normal" /></label></div><button onClick={() => setShowDiscount(false)} className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">Apply adjustments</button></div></div>}

      {showPayment && active && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm" onMouseDown={() => !processing && setShowPayment(false)}><div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl" onMouseDown={(event) => event.stopPropagation()}><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Checkout</p><h2 className="mt-1 text-2xl font-bold text-slate-900">{active.invoiceNumber}</h2></div><button disabled={processing} onClick={() => setShowPayment(false)} className="rounded-xl p-2 hover:bg-slate-100"><X /></button></div><div className="mt-5 rounded-2xl bg-slate-950 p-5 text-white"><p className="text-xs uppercase tracking-wider text-slate-400">Amount due</p><p className="mt-1 text-4xl font-bold">{money(grandTotal)}</p><div className="mt-3 grid grid-cols-2 gap-3 text-sm"><div><span className="text-slate-400">Paid</span><p className="font-semibold">{money(amountPaid)}</p></div><div><span className="text-slate-400">Balance</span><p className="font-semibold">{money(balanceDue)}</p></div></div></div><div className="mt-5 space-y-3">{active.payments.map((payment) => <div key={payment.id} className="grid gap-3 rounded-2xl border border-slate-200 p-4 md:grid-cols-[1fr_1fr_1fr_auto]"><select value={payment.method} onChange={(event) => updatePayment(payment.id, { method: event.target.value as SalePaymentMethod })} className="rounded-xl border p-3 text-sm">{paymentMethods.map((method) => <option key={method} value={method}>{method}</option>)}</select><input type="number" min="0" value={payment.amount} onChange={(event) => updatePayment(payment.id, { amount: Math.max(0, Number(event.target.value)) })} className="rounded-xl border p-3 text-sm" placeholder="Amount" /><input value={payment.reference} onChange={(event) => updatePayment(payment.id, { reference: event.target.value })} className="rounded-xl border p-3 text-sm" placeholder="Reference / receipt" /><button disabled={active.payments.length === 1} onClick={() => removePayment(payment.id)} className="rounded-xl p-3 text-slate-400 hover:bg-red-50 hover:text-red-600"><Trash2 size={18} /></button></div>)}<button onClick={addPayment} className="rounded-xl border border-dashed border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-slate-500">+ Split payment</button></div>{changeDue > 0 && <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">Change due: {money(changeDue)}</div>}{balanceDue > 0 && <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm font-semibold text-amber-800">Outstanding: {money(balanceDue)}. Use Credit for an approved credit sale.</div>}<button disabled={processing} onClick={completeCurrentSale} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-4 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-50"><CreditCard size={18} /> {processing ? "Posting transaction..." : "Validate & complete sale"}</button></div></div>}

      {showHistory && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm" onMouseDown={() => setShowHistory(false)}><div className="max-h-[88vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl" onMouseDown={(event) => event.stopPropagation()}><div className="flex items-center justify-between gap-4"><div><h2 className="text-2xl font-bold">Sales history</h2><p className="text-sm text-slate-500">Search invoices without leaving the POS workspace.</p></div><button onClick={() => setShowHistory(false)} className="rounded-xl p-2 hover:bg-slate-100"><X /></button></div><div className="relative mt-5"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input value={historySearch} onChange={(event) => setHistorySearch(event.target.value)} className="w-full rounded-2xl border bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:bg-white" placeholder="Search invoice or customer..." /></div><div className="mt-5 overflow-x-auto rounded-2xl border"><table className="w-full min-w-[760px] text-sm"><thead className="bg-slate-50"><tr><th className="px-4 py-3 text-left">Invoice</th><th className="px-4 py-3 text-left">Customer</th><th className="px-4 py-3 text-left">Date</th><th className="px-4 py-3 text-right">Total</th><th className="px-4 py-3 text-left">Payment</th><th className="px-4 py-3 text-left">Status</th></tr></thead><tbody>{filteredHistory.map((sale) => <tr key={sale.id} className="border-t"><td className="px-4 py-3 font-semibold">{sale.invoiceNumber}</td><td className="px-4 py-3">{customers.find((customer) => customer.id === sale.customerId)?.name ?? sale.customerId || "Walk-in"}</td><td className="px-4 py-3">{sale.date}</td><td className="px-4 py-3 text-right font-semibold">{money(sale.total)}</td><td className="px-4 py-3">{sale.paymentMethod ?? "-"}</td><td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${sale.status === "Completed" ? "bg-emerald-50 text-emerald-700" : sale.status === "Cancelled" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}>{sale.status}</span></td></tr>)}{filteredHistory.length === 0 && <tr><td colSpan={6} className="px-4 py-12 text-center text-slate-500">No matching invoices.</td></tr>}</tbody></table></div></div></div>}
    </div>
  );
}
