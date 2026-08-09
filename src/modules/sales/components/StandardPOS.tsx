import { useCallback, useEffect, useMemo, useState } from "react";
import { Banknote, Barcode, CheckCircle2, CreditCard, Minus, Package, Plus, Search, ShoppingCart, Trash2, Wifi, WifiOff, X } from "lucide-react";
import { useAuth } from "../../../auth/AuthContext";
import { requireDesktopApi } from "../../../lib/desktopApi";
import type { InventoryItem } from "../../inventory/types/InventoryItem";
import { inventoryService } from "../../inventory/services/InventoryService";
import { useBarcodeScanner } from "../hooks/useBarcodeScanner";

type PaymentMethod = "Cash" | "POS" | "Bank Transfer";
type CartLine = { id: string; productId: string; quantity: number; unitPrice: number };
type PaymentLine = { id: string; method: PaymentMethod; amount: number; reference: string };
type Cart = { id: string; customerId: string; customerName: string; customerPhone: string; items: CartLine[]; payments: PaymentLine[]; discount: number };

const money = (value: number) => `₦${Math.max(0, value).toLocaleString("en-NG", { maximumFractionDigits: 2 })}`;
const uid = () => crypto.randomUUID();
const newPayment = (): PaymentLine => ({ id: uid(), method: "Cash", amount: 0, reference: "" });
const newCart = (): Cart => ({ id: uid(), customerId: "", customerName: "Walk-in Customer", customerPhone: "", items: [], payments: [newPayment()], discount: 0 });

export default function StandardPOS() {
  const { user } = useAuth();
  const api = requireDesktopApi();
  const [products, setProducts] = useState<InventoryItem[]>([]);
  const [customers, setCustomers] = useState<Array<{ id: string; name: string; phone: string }>>([]);
  const [cart, setCart] = useState<Cart>(() => newCart());
  const [parked, setParked] = useState<Cart[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [parkedOpen, setParkedOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [online, setOnline] = useState(navigator.onLine);
  const [cashInput, setCashInput] = useState("");
  const [customerQuery, setCustomerQuery] = useState("");

  const refreshProducts = useCallback(async () => setProducts(await inventoryService.getAll()), []);
  const refreshCustomers = useCallback(async (query = "") => {
    const rows = await api.erp.customers.list(query);
    setCustomers((rows as any[]).map((row) => ({ id: String(row.id), name: String(row.name ?? row.full_name ?? ""), phone: String(row.phone ?? "") })));
  }, [api]);

  useEffect(() => { void refreshProducts(); void refreshCustomers(); }, [refreshCustomers, refreshProducts]);
  useEffect(() => {
    const on = () => setOnline(true); const off = () => setOnline(false);
    window.addEventListener("online", on); window.addEventListener("offline", off);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);

  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))], [products]);
  const visibleProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => (category === "All" || p.category === category) && (!q || p.itemName.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.barcode.toLowerCase().includes(q)));
  }, [category, products, search]);

  const subtotal = cart.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const discount = Math.min(subtotal, Math.max(0, cart.discount));
  const total = Math.max(0, subtotal - discount);
  const paid = cart.payments.reduce((sum, p) => sum + Math.max(0, Number(p.amount) || 0), 0);
  const balance = Math.max(0, total - paid);
  const change = Math.max(0, paid - total);

  function addProduct(product: InventoryItem) {
    setMessage("");
    if (product.quantity <= 0) { setMessage(`${product.itemName} is out of stock.`); return; }
    setCart((current) => {
      const existing = current.items.find((i) => i.productId === product.id);
      return { ...current, items: existing ? current.items.map((i) => i.productId === product.id ? { ...i, quantity: Math.min(product.quantity, i.quantity + 1) } : i) : [...current.items, { id: uid(), productId: product.id, quantity: 1, unitPrice: product.sellingPrice }] };
    });
  }

  const addByBarcode = useCallback((barcode: string) => {
    const product = products.find((item) => item.barcode === barcode || item.sku === barcode);
    if (product) addProduct(product); else setMessage(`Barcode ${barcode} was not found.`);
  }, [products]);
  useBarcodeScanner({ onScan: addByBarcode });

  function changeQty(lineId: string, delta: number) {
    setCart((current) => ({ ...current, items: current.items.map((i) => i.id === lineId ? { ...i, quantity: i.quantity + delta } : i).filter((i) => i.quantity > 0) }));
  }
  function parkCart() {
    if (!cart.items.length) { setMessage("There is no active sale to hold."); return; }
    setParked((current) => [...current, cart]); setCart(newCart()); setMessage("Cart parked. Ready for the next customer.");
  }
  function restoreCart(id: string) {
    const selected = parked.find((item) => item.id === id); if (!selected) return;
    setCart(selected); setParked((current) => current.filter((item) => item.id !== id)); setParkedOpen(false);
  }
  function updatePayment(id: string, patch: Partial<PaymentLine>) { setCart((current) => ({ ...current, payments: current.payments.map((p) => p.id === id ? { ...p, ...patch } : p) })); }
  function setCashTender(amount: number) {
    const payment = cart.payments.find((p) => p.method === "Cash") ?? cart.payments[0];
    updatePayment(payment.id, { method: "Cash", amount }); setCashInput(String(amount));
  }
  function addPaymentLine() { setCart((current) => ({ ...current, payments: [...current.payments, { ...newPayment(), amount: Math.max(0, total - paid) }] })); }
  function removePaymentLine(id: string) { setCart((current) => current.payments.length <= 1 ? current : { ...current, payments: current.payments.filter((p) => p.id !== id) }); }

  async function createCustomer() {
    const name = cart.customerName.trim(); const phone = cart.customerPhone.trim();
    if (!name || name === "Walk-in Customer") return;
    try {
      const result = await api.erp.customers.create({ name, phone, type: "individual", email: "", address: "" });
      const rows = result as any[]; const created = rows.find((row) => String(row.name ?? row.full_name) === name && String(row.phone ?? "") === phone) ?? rows[0];
      if (created) setCart((current) => ({ ...current, customerId: String(created.id), customerName: String(created.name ?? created.full_name ?? name) }));
    } catch (error) { setMessage(error instanceof Error ? error.message : "Unable to save customer."); }
  }

  async function completeSale() {
    if (!cart.items.length) { setMessage("Add products before checkout."); return; }
    if (balance > 0) { setMessage(`Payment is short by ${money(balance)}.`); return; }
    setBusy(true); setMessage("");
    try {
      const saleNumber = `POS-${new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14)}-${Math.floor(Math.random() * 900 + 100)}`;
      const result = await api.erp.sales.create({ saleNumber, customerId: cart.customerId || null, warehouseId: null, userId: user?.id ?? null, paymentMethod: cart.payments.map((p) => p.method).join(" + "), paidAmount: paid, items: cart.items.map((item) => ({ productId: item.productId, quantity: item.quantity, unitPrice: item.unitPrice, discount: 0, tax: 0 })) });
      setCart(newCart()); setCheckoutOpen(false); setCashInput(""); await refreshProducts();
      setMessage(`Sale ${String((result as any)?.saleNumber ?? saleNumber)} completed successfully.`);
    } catch (error) { setMessage(error instanceof Error ? error.message : "Unable to complete sale."); }
    finally { setBusy(false); }
  }
  async function openHistory() { setHistory((await api.erp.sales.list()) as any[]); setHistoryOpen(true); }
  const productById = (id: string) => products.find((p) => p.id === id);

  return <div className="min-h-full min-w-0 bg-slate-50 pb-6">
    <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-3 py-3 shadow-sm backdrop-blur sm:px-5">
      <div className="flex flex-wrap items-center gap-2">
        <div className="mr-auto flex items-center gap-2"><div className="grid h-10 w-10 place-items-center rounded-xl bg-teal-700 text-white"><ShoppingCart size={19}/></div><div><div className="text-xs font-bold uppercase tracking-[.16em] text-slate-400">Sales</div><div className="text-lg font-black text-slate-900">Point of Sale</div></div></div>
        <div className={`hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold sm:flex ${online ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{online ? <Wifi size={14}/> : <WifiOff size={14}/>} {online ? "Online" : "Offline"}</div>
        <button onClick={() => setParkedOpen(true)} className="relative rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">Hold <span className="ml-1 rounded-full bg-amber-100 px-1.5 text-amber-800">{parked.length}</span></button>
        <button onClick={() => void openHistory()} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">Sales history</button>
      </div>
    </div>

    <div className="grid min-h-[calc(100vh-150px)] min-w-0 grid-cols-1 gap-4 p-3 sm:p-5 xl:grid-cols-[minmax(0,1fr)_minmax(360px,430px)]">
      <section className="min-w-0 space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row"><label className="relative min-w-0 flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18}/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search product, SKU or barcode" className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-semibold outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-50"/></label><div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3"><Barcode size={18} className="text-teal-700"/><span className="text-xs font-bold text-slate-500">Scanner ready</span></div></div>
          <div className="mt-3 flex max-w-full gap-2 overflow-x-auto pb-1">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold ${category === item ? "bg-teal-700 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{item}</button>)}</div>
        </div>
        {message && <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">{message}</div>}
        <div className="grid min-w-0 grid-cols-2 gap-3 md:grid-cols-3 2xl:grid-cols-4">{visibleProducts.map((product) => <button key={product.id} onClick={() => addProduct(product)} className="group min-w-0 rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md"><div className="flex h-24 items-center justify-center rounded-xl bg-slate-100 text-slate-400"><Package size={30}/></div><div className="mt-3 min-w-0"><div className="break-words text-sm font-black leading-5 text-slate-900">{product.itemName}</div><div className="mt-1 truncate text-[11px] font-semibold text-slate-400">{product.sku || product.barcode || "No SKU"}</div><div className="mt-2 flex items-end justify-between gap-2"><span className="text-base font-black text-teal-700">{money(product.sellingPrice)}</span><span className={`text-[10px] font-bold ${product.quantity <= 0 ? "text-rose-600" : product.quantity <= product.reorderLevel ? "text-amber-600" : "text-slate-400"}`}>{product.quantity} in stock</span></div></div></button>)}</div>
        {!visibleProducts.length && <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-sm font-semibold text-slate-500">No products match this search.</div>}
      </section>

      <aside className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:sticky xl:top-[88px] xl:max-h-[calc(100vh-110px)]">
        <div className="border-b border-slate-200 p-4"><div className="flex items-center justify-between gap-2"><div><div className="text-xs font-bold uppercase tracking-[.16em] text-slate-400">Active cart</div><div className="text-lg font-black text-slate-900">{cart.items.length} item{cart.items.length === 1 ? "" : "s"}</div></div><button onClick={() => setCart(newCart())} className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><Trash2 size={17}/></button></div>
          <div className="mt-3 grid grid-cols-[minmax(0,1fr)_110px] gap-2"><input value={cart.customerName} onChange={(e) => { setCart((c) => ({ ...c, customerName: e.target.value, customerId: "" })); setCustomerQuery(e.target.value); void refreshCustomers(e.target.value); }} placeholder="Customer / Walk-in" className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-teal-500"/><input value={cart.customerPhone} onChange={(e) => setCart((c) => ({ ...c, customerPhone: e.target.value }))} placeholder="Phone" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-teal-500"/></div>
          {customerQuery && customers.length > 0 && <div className="mt-2 max-h-28 overflow-y-auto rounded-xl border border-slate-200 bg-white">{customers.slice(0, 5).map((c) => <button key={c.id} onClick={() => { setCart((current) => ({ ...current, customerId: c.id, customerName: c.name, customerPhone: c.phone })); setCustomerQuery(""); }} className="block w-full px-3 py-2 text-left text-xs font-semibold hover:bg-slate-50">{c.name} <span className="text-slate-400">{c.phone}</span></button>)}</div>}
          {cart.customerName.trim() && cart.customerName !== "Walk-in Customer" && !cart.customerId && <button onClick={() => void createCustomer()} className="mt-2 text-xs font-bold text-teal-700">Save customer profile</button>}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-3">{cart.items.length === 0 ? <div className="grid h-full min-h-56 place-items-center text-center text-slate-400"><div><ShoppingCart className="mx-auto mb-3" size={34}/><div className="font-bold">Cart is empty</div><div className="mt-1 text-xs">Tap a product or scan a barcode.</div></div></div> : <div className="space-y-2">{cart.items.map((line) => { const p = productById(line.productId); if (!p) return null; return <div key={line.id} className="rounded-xl border border-slate-200 p-3"><div className="flex gap-2"><div className="min-w-0 flex-1"><div className="break-words text-sm font-bold leading-5 text-slate-900">{p.itemName}</div><div className="mt-1 text-xs text-slate-400">{money(line.unitPrice)} each</div></div><button onClick={() => changeQty(line.id, -line.quantity)} className="self-start p-1 text-slate-400 hover:text-rose-600"><X size={15}/></button></div><div className="mt-3 flex items-center justify-between"><div className="flex items-center rounded-lg border border-slate-200"><button onClick={() => changeQty(line.id, -1)} className="p-2 hover:bg-slate-50"><Minus size={14}/></button><span className="w-8 text-center text-sm font-black">{line.quantity}</span><button onClick={() => changeQty(line.id, 1)} className="p-2 hover:bg-slate-50"><Plus size={14}/></button></div><div className="text-sm font-black text-slate-900">{money(line.quantity * line.unitPrice)}</div></div></div>; })}</div>}</div>
        <div className="border-t border-slate-200 bg-slate-50 p-4"><div className="space-y-2 text-sm"><div className="flex justify-between"><span className="text-slate-500">Subtotal</span><span className="font-bold">{money(subtotal)}</span></div><div className="flex items-center justify-between gap-3"><span className="text-slate-500">Discount</span><input type="number" min="0" value={cart.discount || ""} onChange={(e) => setCart((c) => ({ ...c, discount: Number(e.target.value) || 0 }))} className="w-24 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-right text-xs font-bold"/></div><div className="flex justify-between border-t border-slate-200 pt-3 text-base"><span className="font-black">Total</span><span className="font-black text-teal-700">{money(total)}</span></div></div><div className="mt-4 grid grid-cols-2 gap-2"><button onClick={parkCart} className="rounded-xl border border-amber-300 bg-amber-50 px-3 py-3 text-sm font-black text-amber-800">Hold Cart</button><button onClick={() => { setCashTender(total); setCheckoutOpen(true); }} disabled={!cart.items.length} className="rounded-xl bg-teal-700 px-3 py-3 text-sm font-black text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-40">Checkout {money(total)}</button></div></div>
      </aside>
    </div>

    {checkoutOpen && <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/60 p-3 backdrop-blur-sm"><div className="flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"><div className="flex items-center justify-between border-b border-slate-200 px-5 py-4"><div><div className="text-xs font-bold uppercase tracking-[.16em] text-slate-400">Checkout</div><div className="text-xl font-black text-slate-900">{money(total)}</div></div><button onClick={() => setCheckoutOpen(false)} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"><X/></button></div><div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[1fr_340px]"><div className="space-y-4 p-5"><div className="grid gap-3 sm:grid-cols-3">{(["Cash", "POS", "Bank Transfer"] as PaymentMethod[]).map((method) => <button key={method} onClick={() => { const payment = cart.payments[0]; updatePayment(payment.id, { method, amount: Math.max(0, total - (paid - payment.amount)) }); }} className={`rounded-2xl border p-4 text-left ${cart.payments[0]?.method === method ? "border-teal-500 bg-teal-50 text-teal-800" : "border-slate-200"}`}>{method === "Cash" ? <Banknote/> : <CreditCard/>}<div className="mt-2 text-sm font-black">{method}</div></button>)}</div><div className="space-y-2">{cart.payments.map((payment) => <div key={payment.id} className="grid grid-cols-[120px_minmax(0,1fr)_auto] gap-2"><select value={payment.method} onChange={(e) => updatePayment(payment.id, { method: e.target.value as PaymentMethod })} className="rounded-xl border border-slate-200 px-3 text-sm font-bold"><option>Cash</option><option>POS</option><option>Bank Transfer</option></select><input type="number" min="0" value={payment.amount || ""} onChange={(e) => updatePayment(payment.id, { amount: Number(e.target.value) || 0 })} className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-bold" placeholder="Amount"/><button onClick={() => removePaymentLine(payment.id)} className="rounded-xl border border-slate-200 px-3 text-slate-400 hover:text-rose-600"><Trash2 size={16}/></button></div>)}</div><button onClick={addPaymentLine} className="text-sm font-black text-teal-700">+ Add split payment</button>{cart.payments.some((p) => p.method === "Bank Transfer") && <input placeholder="Transfer reference / confirmation note" value={cart.payments.find((p) => p.method === "Bank Transfer")?.reference ?? ""} onChange={(e) => { const p = cart.payments.find((item) => item.method === "Bank Transfer"); if (p) updatePayment(p.id, { reference: e.target.value }); }} className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm"/>}<div className="rounded-2xl bg-slate-900 p-4 text-white"><div className="flex justify-between text-sm text-slate-300"><span>Paid</span><span>{money(paid)}</span></div><div className="mt-2 flex justify-between text-sm text-slate-300"><span>Balance</span><span>{money(balance)}</span></div><div className="mt-3 border-t border-white/10 pt-3"><div className="text-xs uppercase tracking-wider text-slate-400">Change due</div><div className="mt-1 text-3xl font-black text-emerald-400">{money(change)}</div></div></div></div><div className="border-t border-slate-200 bg-slate-50 p-5 lg:border-l lg:border-t-0"><div className="text-sm font-black text-slate-900">Cash quick tender</div><div className="mt-3 grid grid-cols-3 gap-2">{[1000,5000,10000,20000,50000,100000].map((amount) => <button key={amount} onClick={() => setCashTender(amount)} className="rounded-xl border border-slate-200 bg-white py-3 text-xs font-black hover:border-teal-300">{money(amount)}</button>)}</div><div className="mt-4 grid grid-cols-3 gap-2">{["1","2","3","4","5","6","7","8","9","00","0","⌫"].map((key) => <button key={key} onClick={() => { if (key === "⌫") setCashInput((v) => v.slice(0,-1)); else { const next = cashInput + key; setCashInput(next); const value = Number(next); const p = cart.payments.find((item) => item.method === "Cash") ?? cart.payments[0]; updatePayment(p.id, { method: "Cash", amount: value }); } }} className="rounded-xl border border-slate-200 bg-white py-4 text-lg font-black hover:bg-slate-100">{key}</button>)}</div><button disabled={busy || balance > 0} onClick={() => void completeSale()} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 py-4 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-40">{busy ? "Processing…" : <><CheckCircle2 size={18}/> Complete sale</>}</button></div></div></div></div>}

    {parkedOpen && <div className="fixed inset-0 z-[110] bg-slate-950/50 p-3 backdrop-blur-sm"><div className="ml-auto flex h-full w-full max-w-md flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"><div className="flex items-center justify-between border-b p-4"><div><div className="text-xs font-bold uppercase tracking-wider text-slate-400">Parked orders</div><div className="text-lg font-black">{parked.length} waiting</div></div><button onClick={() => setParkedOpen(false)}><X/></button></div><div className="min-h-0 flex-1 overflow-y-auto p-4">{parked.map((item) => <div key={item.id} className="mb-3 rounded-2xl border p-4"><div className="font-black">{item.customerName}</div><div className="mt-1 text-xs text-slate-500">{item.items.length} items · {money(item.items.reduce((s, i) => s + i.quantity * i.unitPrice, 0))}</div><button onClick={() => restoreCart(item.id)} className="mt-3 w-full rounded-xl bg-teal-700 py-2.5 text-sm font-black text-white">Restore cart</button></div>)}</div></div></div>}

    {historyOpen && <div className="fixed inset-0 z-[110] grid place-items-center bg-slate-950/50 p-3"><div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"><div className="flex items-center justify-between border-b p-4"><div className="text-lg font-black">Recent sales</div><button onClick={() => setHistoryOpen(false)}><X/></button></div><div className="min-h-0 flex-1 overflow-auto">{history.map((sale) => <div key={sale.id} className="grid min-w-[680px] grid-cols-5 gap-3 border-b px-4 py-3 text-sm"><span className="font-bold">{sale.sale_number}</span><span>{sale.customer_name ?? "Walk-in"}</span><span>{money(Number(sale.total))}</span><span>{sale.payment_status}</span><span className="text-slate-400">{new Date(sale.created_at).toLocaleString()}</span></div>)}</div></div></div>}
  </div>;
}
