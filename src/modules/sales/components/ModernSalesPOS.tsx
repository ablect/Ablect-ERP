import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  Archive,
  Barcode,
  Banknote,
  Calculator,
  Check,
  ChevronDown,
  Clock3,
  CreditCard,
  Grid2X2,
  History,
  Minus,
  Plus,
  Printer,
  Receipt,
  RotateCcw,
  Search,
  ShoppingCart,
  Sparkles,
  Trash2,
  UserRound,
  WalletCards,
  X,
  Zap,
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
  "POS",
  "Card",
  "Bank Transfer",
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

type Modal = "checkout" | "history" | "loyalty" | "parked" | "discount" | null;

function money(value: number) {
  return `₦${Math.max(0, value).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function shortMoney(value: number) {
  return `₦${Math.round(Math.max(0, value)).toLocaleString("en-NG")}`;
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
    payments: [{ id: crypto.randomUUID(), method: "Cash", amount: 0, reference: "" }],
  };
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
    oscillator.frequency.value = 540;
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.02, context.currentTime + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.05);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.055);
  } catch {
    // UI sound is optional and must never block the transaction.
  }
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
  const [modal, setModal] = useState<Modal>(null);
  const [historySearch, setHistorySearch] = useState("");
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);
  const [cashInput, setCashInput] = useState("");
  const [loyaltyPhone, setLoyaltyPhone] = useState("");
  const [managerPin, setManagerPin] = useState("");
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);
  const [parked, setParked] = useState<Transaction[]>([]);
  const [catalogMode, setCatalogMode] = useState<"products" | "quick">("products");

  const [sales, setLocalSales] = useState<Awaited<ReturnType<typeof saleService.getAll>>>([]);

  const active = transactions.find((transaction) => transaction.id === activeId) ?? transactions[0];

  useEffect(() => {
    if (!activeId && transactions[0]) setActiveId(transactions[0].id);
  }, [activeId, transactions]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const [inventory, existingSales] = await Promise.all([
          inventoryService.getAll(),
          saleService.getAll(),
        ]);
        if (!mounted) return;
        setProducts(inventory);
        setInventory(inventory);
        setLocalSales(existingSales);
        setSales(existingSales);
      } catch (error) {
        if (mounted) setMessage(error instanceof Error ? error.message : "Unable to load sales workspace.");
      }
    }
    void load();
    return () => {
      mounted = false;
    };
  }, [setInventory, setSales]);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((product) => product.category).filter(Boolean)))],
    [products],
  );

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const haystack = `${product.itemName} ${product.sku} ${product.id} ${product.barcode ?? ""}`.toLowerCase();
      return matchesCategory && (!query || haystack.includes(query));
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
  const todaySales = completedSales
    .filter((sale) => sale.date === today)
    .reduce((sum, sale) => sum + sale.total, 0);

  const filteredHistory = sales.filter((sale) => {
    const query = historySearch.trim().toLowerCase();
    return !query || sale.invoiceNumber.toLowerCase().includes(query) || sale.customerId.toLowerCase().includes(query);
  });

  const activeCustomer = customers.find((customer) => customer.id === active?.customerId);

  function updateActive(updater: (transaction: Transaction) => Transaction) {
    if (!active) return;
    setTransactions((current) => current.map((transaction) => (transaction.id === active.id ? updater(transaction) : transaction)));
  }

  function addProduct(product: InventoryItem) {
    playUiClick();
    if (!active) return;
    if (product.quantity <= 0) {
      setMessage(`${product.itemName} is out of stock.`);
      return;
    }
    updateActive((transaction) => {
      const existing = transaction.items.find((item) => item.productId === product.id);
      if (existing) {
        return {
          ...transaction,
          items: transaction.items.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: Math.min(item.quantity + 1, product.quantity) }
              : item,
          ),
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
      items: transaction.items
        .map((item) => (item.id === lineId ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item))
        .filter((item) => item.quantity > 0),
    }));
  }

  function removeLine(lineId: string) {
    updateActive((transaction) => ({ ...transaction, items: transaction.items.filter((item) => item.id !== lineId) }));
  }

  function addTransaction() {
    playUiClick();
    const next = createTransaction(transactions.length + 1);
    setTransactions((current) => [...current, next]);
    setActiveId(next.id);
    setMessage("");
  }

  function closeTransaction(id: string) {
    setTransactions((current) => {
      const remaining = current.filter((transaction) => transaction.id !== id);
      if (!remaining.length) {
        const fresh = createTransaction(1);
        setActiveId(fresh.id);
        return [fresh];
      }
      if (id === activeId) setActiveId(remaining[0].id);
      return remaining;
    });
  }

  function holdCurrent() {
    if (!active || !active.items.length) {
      setMessage("Add an item before holding an order.");
      return;
    }
    playUiClick();
    setParked((current) => [...current, active]);
    closeTransaction(active.id);
    setMessage(`${active.invoiceNumber} parked successfully.`);
  }

  function restoreParked(transaction: Transaction) {
    setTransactions((current) => [...current, transaction]);
    setParked((current) => current.filter((item) => item.id !== transaction.id));
    setActiveId(transaction.id);
    setModal(null);
  }

  function selectCustomer(customerId: string) {
    updateActive((transaction) => ({ ...transaction, customerId }));
    setMessage("");
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
      payments: transaction.payments.map((payment) => (payment.id === id ? { ...payment, ...patch } : payment)),
    }));
  }

  function removePayment(id: string) {
    updateActive((transaction) => ({
      ...transaction,
      payments: transaction.payments.length === 1 ? transaction.payments : transaction.payments.filter((payment) => payment.id !== id),
    }));
  }

  function setCashTender(amount: number) {
    setCashInput(String(amount));
    const cashLine = active?.payments.find((payment) => payment.method === "Cash");
    if (cashLine) updatePayment(cashLine.id, { amount });
  }

  function handleNumpad(value: string) {
    playUiClick();
    if (value === "clear") {
      setCashTender(0);
      return;
    }
    if (value === "back") {
      const next = cashInput.slice(0, -1);
      setCashTender(Number(next || 0));
      return;
    }
    const next = `${cashInput}${value}`;
    setCashTender(Number(next || 0));
  }

  async function refreshSalesAndInventory() {
    const [inventory, existingSales] = await Promise.all([inventoryService.getAll(), saleService.getAll()]);
    setProducts(inventory);
    setInventory(inventory);
    setLocalSales(existingSales);
    setSales(existingSales);
  }

  async function completeCurrentSale() {
    if (!active) return;
    setMessage("");
    if (!active.customerId) {
      setMessage("Select a customer or create a walk-in customer record before completing the sale.");
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
      const saleId = crypto.randomUUID();
      const now = new Date().toISOString();
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
        paymentStatus: balanceDue <= 0 ? ("Paid" as const) : amountPaid > 0 ? ("Partially Paid" as const) : ("Unpaid" as const),
        paymentMethod: active.payments.map((payment) => payment.method).join(" + "),
        status: "Draft" as const,
      };

      await saleService.create(sale);
      await saleItemService.createMany(
        active.items.map((line) => createSaleItem(saleId, line.productId, line.quantity, line.unitPrice)),
      );
      await completeSale(saleId);
      await salePaymentService.createMany(
        active.payments
          .filter((payment) => payment.amount > 0)
          .map((payment) => ({
            id: crypto.randomUUID(),
            saleId,
            method: payment.method,
            amount: payment.amount,
            reference: payment.reference.trim() || undefined,
            createdAt: now,
          })),
      );

      await refreshSalesAndInventory();
      const invoice = active.invoiceNumber;
      closeTransaction(active.id);
      setModal(null);
      setCashInput("");
      setMessage(`✓ ${invoice} completed successfully.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to complete sale.");
    } finally {
      setProcessing(false);
    }
  }

  function printInvoice() {
    playUiClick();
    window.print();
  }

  function startLoyalty() {
    if (!loyaltyPhone.trim()) {
      setMessage("Enter a customer phone number first.");
      return;
    }
    const match = customers.find((customer) => customer.phone.replace(/\D/g, "").includes(loyaltyPhone.replace(/\D/g, "")));
    if (match) {
      selectCustomer(match.id);
      setMessage(`${match.name} selected. Loyalty profile attached to this sale.`);
      setModal(null);
      return;
    }
    setMessage("No existing customer found. Continue with the customer module to create a new loyalty profile.");
  }

  const adminView = typeof window !== "undefined" && localStorage.getItem("ablect_user_role") === "admin";

  return (
    <div className="min-h-full overflow-x-hidden bg-slate-50 pb-8 text-slate-900">
      <div className="sticky top-0 z-30 border-b border-slate-200/80 bg-slate-50/95 px-3 py-3 backdrop-blur-xl sm:px-5 lg:px-6">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-slate-950 to-slate-700 text-white shadow-lg shadow-slate-900/15">
              <ShoppingCart size={21} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
                <Zap size={12} /> Live sales terminal
              </div>
              <h1 className="truncate text-xl font-black tracking-tight sm:text-2xl">Sales & POS</h1>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 md:flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> Online
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {adminView && (
              <div className="rounded-2xl border border-violet-200 bg-violet-50 px-4 py-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-violet-500">Today sales</div>
                <div className="text-sm font-black text-violet-900">{shortMoney(todaySales)}</div>
              </div>
            )}
            <button onClick={() => setModal("parked")} className="relative inline-flex min-h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300">
              <Archive size={17} /> Parked
              {parked.length > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-amber-500 px-1 text-[10px] text-white">{parked.length}</span>}
            </button>
            <button onClick={() => setModal("history")} className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300">
              <History size={17} /> Orders
            </button>
            <button onClick={addTransaction} className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-slate-950 px-4 text-sm font-bold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-800">
              <Plus size={17} /> New order
            </button>
          </div>
        </div>

        <div className="mt-3 flex max-w-full gap-2 overflow-x-auto pb-1">
          {transactions.map((transaction, index) => (
            <button
              key={transaction.id}
              onClick={() => setActiveId(transaction.id)}
              className={`group flex min-w-[170px] items-center justify-between gap-3 rounded-2xl border px-3 py-2 text-left transition ${transaction.id === active?.id ? "border-slate-950 bg-slate-950 text-white shadow-lg" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"}`}
            >
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-wider opacity-60">Order {index + 1}</div>
                <div className="truncate text-xs font-black">{transaction.invoiceNumber}</div>
              </div>
              <X size={15} onClick={(event) => { event.stopPropagation(); closeTransaction(transaction.id); }} className="shrink-0 opacity-50 hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>

      <div className="grid min-h-[calc(100vh-190px)] grid-cols-1 gap-4 p-3 sm:p-5 lg:grid-cols-[minmax(0,1fr)_minmax(360px,430px)] lg:items-start lg:p-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(420px,500px)]">
        <section className="min-w-0 rounded-[28px] border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search product, SKU or barcode..." className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-semibold outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5" />
            </div>
            <div className="flex shrink-0 rounded-2xl bg-slate-100 p-1">
              <button onClick={() => setCatalogMode("products")} className={`rounded-xl px-4 py-2 text-xs font-bold ${catalogMode === "products" ? "bg-white shadow-sm" : "text-slate-500"}`}><Grid2X2 size={15} className="mr-1 inline" /> Products</button>
              <button onClick={() => setCatalogMode("quick")} className={`rounded-xl px-4 py-2 text-xs font-bold ${catalogMode === "quick" ? "bg-white shadow-sm" : "text-slate-500"}`}><Calculator size={15} className="mr-1 inline" /> Quick tools</button>
            </div>
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {categories.map((item) => (
              <button key={item} onClick={() => setCategory(item)} className={`min-h-10 shrink-0 rounded-xl px-4 text-xs font-bold transition ${category === item ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}>{item}</button>
            ))}
          </div>

          {catalogMode === "products" ? (
            <div className="mt-4 grid max-h-[calc(100vh-365px)] min-h-[430px] grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.button
                    layout
                    key={product.id}
                    onClick={() => addProduct(product)}
                    whileTap={{ scale: 0.97 }}
                    className="group min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
                  >
                    <div className="relative flex aspect-[1.25] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
                      {product.imageUrl ? <img src={product.imageUrl} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <ShoppingCart className="text-slate-300" size={34} />}
                      <span className={`absolute left-2 top-2 rounded-full px-2 py-1 text-[9px] font-black ${product.quantity <= 0 ? "bg-rose-100 text-rose-700" : product.quantity <= product.reorderLevel ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>{product.quantity <= 0 ? "OUT" : `${product.quantity} ${product.unit}`}</span>
                    </div>
                    <div className="min-w-0 p-3">
                      <div className="min-h-[34px] break-words text-xs font-extrabold leading-4 text-slate-800">{product.itemName}</div>
                      <div className="mt-2 flex items-center justify-between gap-2"><span className="truncate text-[10px] font-semibold text-slate-400">{product.sku}</span><span className="shrink-0 text-sm font-black text-slate-950">{shortMoney(product.sellingPrice)}</span></div>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
              {!filteredProducts.length && <div className="col-span-full grid min-h-64 place-items-center rounded-3xl border border-dashed border-slate-200 text-sm font-semibold text-slate-400">No matching products.</div>}
            </div>
          ) : (
            <div className="mt-4 grid max-h-[calc(100vh-365px)] min-h-[430px] grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-3">
              {[{ label: "Scan barcode", icon: Barcode }, { label: "Open calculator", icon: Calculator }, { label: "Customer loyalty", icon: Sparkles }, { label: "Print last invoice", icon: Printer }, { label: "Park current order", icon: Archive }, { label: "Order history", icon: History }].map(({ label, icon: Icon }) => (
                <button key={label} onClick={() => { if (label === "Customer loyalty") setModal("loyalty"); else if (label === "Park current order") holdCurrent(); else if (label === "Order history") setModal("history"); else if (label === "Print last invoice") printInvoice(); else setMessage(`${label} is ready for the next hardware integration.`); }} className="min-h-32 rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg">
                  <Icon size={25} className="text-slate-950" /><div className="mt-4 text-sm font-black">{label}</div><div className="mt-1 text-xs text-slate-400">Fast terminal action</div>
                </button>
              ))}
            </div>
          )}
        </section>

        <aside className="min-w-0 rounded-[28px] border border-slate-200 bg-slate-950 text-white shadow-2xl shadow-slate-900/10 lg:sticky lg:top-[168px]">
          <div className="border-b border-white/10 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div><div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Active order</div><div className="mt-1 text-lg font-black">{active?.invoiceNumber}</div></div>
              <button onClick={holdCurrent} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-bold text-slate-200 transition hover:bg-white/10"><Archive size={15} /> Hold</button>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
              <UserRound size={18} className="ml-2 shrink-0 text-slate-400" />
              <select value={active?.customerId ?? ""} onChange={(event) => selectCustomer(event.target.value)} className="min-w-0 flex-1 bg-transparent px-2 py-2 text-xs font-bold text-white outline-none [&>option]:text-slate-900">
                <option value="">Select customer / walk-in</option>
                {customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.name} • {customer.phone}</option>)}
              </select>
              <button onClick={() => setModal("loyalty")} className="rounded-xl bg-white px-3 py-2 text-[10px] font-black text-slate-950">Loyalty</button>
            </div>
            {activeCustomer && <div className="mt-2 flex items-center justify-between px-1 text-[10px] text-slate-400"><span>{activeCustomer.tier ?? "Standard"} customer</span><span>{activeCustomer.loyaltyPoints ?? 0} pts</span></div>}
          </div>

          <div className="max-h-[42vh] min-h-[230px] overflow-y-auto p-4 sm:p-5">
            <AnimatePresence initial={false}>
              {active?.items.map((line) => {
                const product = products.find((item) => item.id === line.productId);
                if (!product) return null;
                return (
                  <motion.div layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 20 }} key={line.id} className="mb-3 rounded-2xl border border-white/10 bg-white/[0.045] p-3">
                    <div className="flex gap-3"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10"><ShoppingCart size={17} /></div><div className="min-w-0 flex-1"><div className="break-words text-xs font-extrabold leading-4 text-white">{product.itemName}</div><div className="mt-1 text-[10px] text-slate-400">{money(line.unitPrice)} each</div></div><button onClick={() => removeLine(line.id)} className="shrink-0 self-start text-slate-500 transition hover:text-rose-300"><Trash2 size={15} /></button></div>
                    <div className="mt-3 flex items-center justify-between"><div className="flex items-center rounded-xl border border-white/10 bg-black/10"><button onClick={() => changeQuantity(line.id, -1)} className="grid h-9 w-9 place-items-center text-slate-300 hover:bg-white/10"><Minus size={14} /></button><span className="w-9 text-center text-xs font-black">{line.quantity}</span><button onClick={() => changeQuantity(line.id, 1)} className="grid h-9 w-9 place-items-center text-slate-300 hover:bg-white/10"><Plus size={14} /></button></div><div className="text-sm font-black">{shortMoney(line.quantity * line.unitPrice)}</div></div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            {!active?.items.length && <div className="grid min-h-52 place-items-center rounded-3xl border border-dashed border-white/10 text-center"><div><ShoppingCart size={30} className="mx-auto text-slate-600" /><p className="mt-3 text-sm font-bold text-slate-400">Cart is ready</p><p className="mt-1 text-xs text-slate-600">Scan or tap a product to begin.</p></div></div>}
          </div>

          <div className="border-t border-white/10 p-4 sm:p-5">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-400"><span>Subtotal</span><span>{money(subtotal)}</span></div>
              <div className="flex justify-between text-slate-400"><span>Discount</span><button onClick={() => setModal("discount")} className="font-bold text-white hover:text-cyan-300">-{money(discountAmount)}</button></div>
              <div className="flex justify-between text-slate-400"><span>Tax</span><span>{money(taxAmount)}</span></div>
            </div>
            <div className="my-4 flex items-end justify-between gap-3 rounded-2xl bg-white/10 p-4"><span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total</span><span className="text-2xl font-black tracking-tight">{money(grandTotal)}</span></div>
            {message && <div className="mb-3 break-words rounded-2xl border border-amber-400/20 bg-amber-400/10 p-3 text-xs font-semibold text-amber-200">{message}</div>}
            <div className="grid grid-cols-2 gap-2"><button onClick={holdCurrent} className="min-h-12 rounded-2xl border border-white/10 bg-white/5 text-xs font-black transition hover:bg-white/10">Hold order</button><button disabled={!active?.items.length} onClick={() => setModal("checkout")} className="min-h-12 rounded-2xl bg-cyan-400 text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40">Checkout <span className="ml-1">→</span></button></div>
          </div>
        </aside>
      </div>

      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 p-2 backdrop-blur-sm sm:items-center sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget && !processing) setModal(null); }}>
            <motion.div initial={{ opacity: 0, y: 30, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20 }} className="max-h-[94vh] w-full max-w-4xl overflow-hidden rounded-[30px] border border-white/60 bg-white shadow-2xl">
              {modal === "checkout" && (
                <div className="flex max-h-[94vh] flex-col">
                  <div className="flex items-center justify-between border-b border-slate-200 p-5 sm:p-6"><div><div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Secure checkout</div><h2 className="mt-1 text-2xl font-black">Complete {active?.invoiceNumber}</h2></div><button onClick={() => setModal(null)} className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100"><X size={18} /></button></div>
                  <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[1fr_340px]">
                    <div className="p-5 sm:p-6">
                      <div className="grid grid-cols-3 gap-2"><div className="rounded-2xl bg-slate-950 p-4 text-white"><div className="text-[10px] uppercase tracking-wider text-slate-400">Total</div><div className="mt-1 text-lg font-black">{shortMoney(grandTotal)}</div></div><div className="rounded-2xl bg-emerald-50 p-4 text-emerald-900"><div className="text-[10px] uppercase tracking-wider text-emerald-600">Paid</div><div className="mt-1 text-lg font-black">{shortMoney(amountPaid)}</div></div><div className="rounded-2xl bg-amber-50 p-4 text-amber-900"><div className="text-[10px] uppercase tracking-wider text-amber-600">Balance</div><div className="mt-1 text-lg font-black">{shortMoney(balanceDue)}</div></div></div>
                      <div className="mt-5 space-y-3">
                        {active?.payments.map((payment, index) => <div key={payment.id} className="rounded-2xl border border-slate-200 p-4"><div className="flex flex-wrap items-center gap-2"><select value={payment.method} onChange={(event) => updatePayment(payment.id, { method: event.target.value as SalePaymentMethod })} className="h-11 min-w-[150px] rounded-xl bg-slate-100 px-3 text-xs font-black outline-none">{paymentMethods.map((method) => <option key={method}>{method}</option>)}</select><input type="number" min="0" value={payment.amount || ""} onChange={(event) => updatePayment(payment.id, { amount: Number(event.target.value) || 0 })} className="h-11 min-w-[130px] flex-1 rounded-xl border border-slate-200 px-3 text-sm font-black outline-none focus:ring-4 focus:ring-slate-900/5" placeholder="Amount" /><input value={payment.reference} onChange={(event) => updatePayment(payment.id, { reference: event.target.value })} className="h-11 min-w-[130px] flex-1 rounded-xl border border-slate-200 px-3 text-xs outline-none" placeholder="Reference (optional)" />{index > 0 && <button onClick={() => removePayment(payment.id)} className="grid h-10 w-10 place-items-center rounded-xl bg-rose-50 text-rose-600"><Trash2 size={15} /></button>}</div></div>)}
                        <button onClick={addPayment} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 text-xs font-black text-slate-600 hover:bg-slate-50"><Plus size={15} /> Add split payment</button>
                      </div>
                      <div className="mt-5 rounded-3xl bg-slate-950 p-4 text-white sm:p-5"><div className="flex items-center justify-between"><div><div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Cash tender</div><div className="mt-1 text-2xl font-black">{money(Number(cashInput) || 0)}</div></div><Banknote className="text-emerald-300" size={28} /></div><div className="mt-4 grid grid-cols-4 gap-2">{["1","2","3","4","5","6","7","8","9","0","00","clear"].map((key) => <button key={key} onClick={() => handleNumpad(key)} className="min-h-11 rounded-xl bg-white/10 text-sm font-black transition hover:bg-white/20">{key === "clear" ? "C" : key}</button>)}</div><div className="mt-2 grid grid-cols-2 gap-2"><button onClick={() => handleNumpad("back")} className="min-h-10 rounded-xl bg-white/5 text-xs font-bold">Backspace</button><button onClick={() => setCashTender(grandTotal)} className="min-h-10 rounded-xl bg-cyan-400 text-xs font-black text-slate-950">Exact total</button></div></div>
                    </div>
                    <div className="border-t border-slate-200 bg-slate-50 p-5 lg:border-l lg:border-t-0 sm:p-6"><div className="text-xs font-black uppercase tracking-wider text-slate-400">Payment result</div><div className="mt-3 rounded-3xl bg-white p-5 shadow-sm"><div className="text-xs font-semibold text-slate-400">Change due</div><div className="mt-2 text-3xl font-black text-emerald-600">{money(changeDue)}</div><div className="mt-4 h-px bg-slate-100" /><div className="mt-4 flex justify-between text-xs"><span className="text-slate-400">Customer</span><span className="max-w-[170px] break-words text-right font-bold">{activeCustomer?.name ?? "Walk-in"}</span></div><div className="mt-2 flex justify-between text-xs"><span className="text-slate-400">Payment</span><span className="max-w-[170px] break-words text-right font-bold">{active?.payments.map((payment) => payment.method).join(" + ")}</span></div></div><button disabled={processing} onClick={completeCurrentSale} className="mt-4 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 text-sm font-black text-white shadow-xl transition hover:bg-slate-800 disabled:opacity-50">{processing ? "Processing..." : <><Check size={18} /> Complete sale</>}</button><button onClick={printInvoice} className="mt-2 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white text-xs font-black"><Printer size={16} /> Print preview</button></div>
                  </div>
                </div>
              )}

              {modal === "history" && (
                <div className="flex max-h-[94vh] flex-col"><div className="flex items-center justify-between border-b border-slate-200 p-5"><div><div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Order control</div><h2 className="mt-1 text-2xl font-black">Sales history</h2></div><button onClick={() => setModal(null)} className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100"><X size={18} /></button></div><div className="p-4 sm:p-5"><div className="relative"><Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input value={historySearch} onChange={(event) => setHistorySearch(event.target.value)} placeholder="Search invoice or customer ID" className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none" /></div></div><div className="min-h-0 flex-1 overflow-y-auto px-4 pb-5 sm:px-5">{filteredHistory.map((sale) => <button key={sale.id} onClick={() => setSelectedHistoryId(sale.id)} className="mb-2 grid w-full grid-cols-[1fr_auto] gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-slate-300 hover:shadow-md"><div className="min-w-0"><div className="break-words text-sm font-black">{sale.invoiceNumber}</div><div className="mt-1 text-xs text-slate-400">Customer {sale.customerId} • {sale.date}</div></div><div className="text-right"><div className="text-sm font-black">{money(sale.total)}</div><div className={`mt-1 text-[10px] font-black uppercase ${sale.paymentStatus === "Paid" ? "text-emerald-600" : "text-amber-600"}`}>{sale.paymentStatus ?? sale.status}</div></div></button>)}{!filteredHistory.length && <div className="py-16 text-center text-sm font-semibold text-slate-400">No sales found.</div>}</div>{selectedHistoryId && <div className="border-t border-slate-200 bg-slate-50 p-4"><div className="flex flex-wrap items-center justify-between gap-3"><div className="text-xs font-bold text-slate-500">Paid-order refunds require manager/admin authorization.</div><button onClick={() => { setManagerPin(""); setMessage("Manager override requested. Verify the configured manager PIN before processing a refund."); }} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-slate-950 px-4 text-xs font-black text-white"><RotateCcw size={15} /> Manager override</button></div>{managerPin !== "" && <input value={managerPin} onChange={(event) => setManagerPin(event.target.value)} placeholder="Manager PIN" className="mt-3 h-11 rounded-xl border border-slate-200 px-3 text-sm" />}</div>}</div>
              )}

              {modal === "parked" && <div className="p-5 sm:p-6"><div className="flex items-center justify-between"><div><div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Queue recovery</div><h2 className="mt-1 text-2xl font-black">Parked orders</h2></div><button onClick={() => setModal(null)} className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100"><X size={18} /></button></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{parked.map((transaction) => <button key={transaction.id} onClick={() => restoreParked(transaction)} className="rounded-2xl border border-slate-200 p-4 text-left transition hover:-translate-y-0.5 hover:shadow-lg"><div className="text-sm font-black">{transaction.invoiceNumber}</div><div className="mt-1 text-xs text-slate-400">{transaction.items.length} item(s)</div><div className="mt-3 text-xs font-bold text-slate-700">Restore order →</div></button>)}{!parked.length && <div className="col-span-full rounded-2xl bg-slate-50 p-10 text-center text-sm font-semibold text-slate-400">No parked orders.</div>}</div></div>}

              {modal === "loyalty" && <div className="p-5 sm:p-6"><div className="flex items-center justify-between"><div><div className="text-[10px] font-bold uppercase tracking-wider text-violet-500">Customer experience</div><h2 className="mt-1 text-2xl font-black">Fast loyalty lookup</h2></div><button onClick={() => setModal(null)} className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100"><X size={18} /></button></div><div className="mt-5 rounded-3xl bg-gradient-to-br from-violet-50 to-cyan-50 p-5"><Sparkles className="text-violet-600" size={25} /><p className="mt-3 text-sm font-bold">Attach an existing customer in seconds.</p><p className="mt-1 text-xs text-slate-500">This flow does not interrupt the active cart.</p><input value={loyaltyPhone} onChange={(event) => setLoyaltyPhone(event.target.value)} placeholder="Customer phone number" className="mt-4 h-12 w-full rounded-2xl border border-white bg-white px-4 text-sm font-semibold outline-none" /><button onClick={startLoyalty} className="mt-3 min-h-12 w-full rounded-2xl bg-slate-950 text-sm font-black text-white">Find customer</button></div></div>}

              {modal === "discount" && <div className="p-5 sm:p-6"><div className="flex items-center justify-between"><div><div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pricing control</div><h2 className="mt-1 text-2xl font-black">Order discount</h2></div><button onClick={() => setModal(null)} className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100"><X size={18} /></button></div><div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">{[0, 5, 10, 15].map((percent) => <button key={percent} onClick={() => { updateActive((transaction) => ({ ...transaction, discountPercent: percent })); setModal(null); }} className={`min-h-16 rounded-2xl border text-sm font-black ${active?.discountPercent === percent ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white"}`}>{percent}%</button>)}</div><p className="mt-4 text-xs text-slate-400">Use the pricing engine or your existing approval workflow for larger discretionary discounts.</p></div>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-3 left-1/2 z-40 flex max-w-[calc(100vw-24px)] -translate-x-1/2 items-center gap-2 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-2xl backdrop-blur-xl print:hidden">
        <button onClick={() => setMessage("Barcode scanner ready. Focus is not required for keyboard-wedge scanners.")} className="grid h-11 w-11 place-items-center rounded-xl bg-slate-950 text-white"><Barcode size={18} /></button>
        <button onClick={() => setModal("loyalty")} className="grid h-11 w-11 place-items-center rounded-xl bg-violet-50 text-violet-700"><Sparkles size={18} /></button>
        <button onClick={holdCurrent} className="grid h-11 w-11 place-items-center rounded-xl bg-amber-50 text-amber-700"><Archive size={18} /></button>
        <button onClick={() => setModal("checkout")} disabled={!active?.items.length} className="min-h-11 rounded-xl bg-cyan-500 px-4 text-xs font-black text-slate-950 disabled:opacity-40"><WalletCards size={15} className="mr-1 inline" /> Pay</button>
      </div>

      <style>{`@media print { body * { visibility: hidden !important; } .print-area, .print-area * { visibility: visible !important; } }`}</style>
    </div>
  );
}
