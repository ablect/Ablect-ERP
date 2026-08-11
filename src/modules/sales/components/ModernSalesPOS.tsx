import { useEffect, useMemo, useState } from "react";
import { Barcode, CreditCard, Minus, Plus, Search, ShoppingCart, Trash2, UserRound, WalletCards, X } from "lucide-react";
import { inventoryService } from "../../inventory/services/InventoryService";
import { useInventoryStore } from "../../inventory/store/InventoryStore";
import { useCustomers } from "../../customers/hooks/useCustomers";
import { saleItemService } from "../services/SaleItemService";
import { saleService } from "../services/SaleService";
import { completeSale } from "../utils/completeSale";
import type { SalePaymentMethod } from "../types/SalePayment";
import type { InventoryItem } from "../../inventory/types/InventoryItem";

const paymentMethods: SalePaymentMethod[] = ["Cash", "Card", "Bank Transfer", "POS", "Mobile Money", "Cheque", "Credit"];
let nextInvoicePreview = 1;
const formatInvoice = (value: number) => `INV-${String(Math.max(1, value)).padStart(5, "0")}`;
function syncNextInvoice(sales: Awaited<ReturnType<typeof saleService.getAll>>) {
  const highest = sales.reduce((max, sale) => { const match = /^INV-(\d+)$/.exec(sale.invoiceNumber); return match ? Math.max(max, Number(match[1])) : max; }, 0);
  nextInvoicePreview = Math.max(nextInvoicePreview, highest + 1);
}
function createTransaction() {
  return { id: crypto.randomUUID(), invoiceNumber: formatInvoice(nextInvoicePreview++), customerId: "", items: [] as { id:string; productId:string; quantity:number; unitPrice:number }[], discountPercent: 0, taxPercent: 0, payments: [{ id:crypto.randomUUID(), method:"Cash" as SalePaymentMethod, amount:0, reference:"" }] };
}
function money(value:number) { return `₦${Math.max(0, value).toLocaleString()}`; }

type Transaction = ReturnType<typeof createTransaction>;

export default function ModernSalesPOS() {
  const { customers } = useCustomers();
  const setInventory = useInventoryStore((state) => state.setItems);
  const setSales = useInventoryStore((state) => undefined) as unknown as undefined;
  void setSales;
  const [products, setProducts] = useState<InventoryItem[]>([]);
  const [sales, setLocalSales] = useState<Awaited<ReturnType<typeof saleService.getAll>>>([]);
  const [transactions, setTransactions] = useState<Transaction[]>(() => [createTransaction()]);
  const [activeId, setActiveId] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [message, setMessage] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historySearch, setHistorySearch] = useState("");
  const [processing, setProcessing] = useState(false);

  const active = transactions.find((item) => item.id === activeId) ?? transactions[0];
  useEffect(() => { if (!activeId && transactions[0]) setActiveId(transactions[0].id); }, [activeId, transactions]);

  async function loadCatalog() { const data = await inventoryService.getAll(); setProducts(data); setInventory(data); }
  async function loadSales() {
    const data = await saleService.getAll(); syncNextInvoice(data); setLocalSales(data);
    setTransactions((current) => current.map((item, index) => index === 0 && item.items.length === 0 ? { ...item, invoiceNumber: formatInvoice(nextInvoicePreview++) } : item));
  }
  useEffect(() => { void Promise.all([loadCatalog(), loadSales()]); }, []);

  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map((item) => item.category).filter(Boolean)))], [products]);
  const filteredProducts = useMemo(() => { const query = search.trim().toLowerCase(); return products.filter((product) => (category === "All" || product.category === category) && (!query || product.itemName.toLowerCase().includes(query) || product.sku.toLowerCase().includes(query) || product.barcode.toLowerCase().includes(query))); }, [category, products, search]);
  const subtotal = active?.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0) ?? 0;
  const discountAmount = subtotal * ((active?.discountPercent ?? 0) / 100);
  const taxable = Math.max(0, subtotal - discountAmount);
  const taxAmount = taxable * ((active?.taxPercent ?? 0) / 100);
  const total = Math.max(0, taxable + taxAmount);
  const paid = active?.payments.reduce((sum, item) => sum + Math.max(0, item.amount), 0) ?? 0;
  const balance = Math.max(0, total - paid);
  const change = Math.max(0, paid - total);

  function updateActive(updater:(value:Transaction)=>Transaction) { if (!active) return; setTransactions((current) => current.map((item) => item.id === active.id ? updater(item) : item)); }
  function addProduct(product:InventoryItem) { if (product.quantity <= 0) return setMessage(`${product.itemName} is out of stock.`); setMessage(""); updateActive((transaction) => { const existing = transaction.items.find((item) => item.productId === product.id); if (existing) return { ...transaction, items: transaction.items.map((item) => item.productId === product.id ? { ...item, quantity:Math.min(item.quantity+1, product.quantity) } : item) }; return { ...transaction, items:[...transaction.items,{ id:crypto.randomUUID(), productId:product.id, quantity:1, unitPrice:product.sellingPrice }] }; }); }
  function changeQuantity(id:string, delta:number) { updateActive((transaction) => ({ ...transaction, items:transaction.items.map((item) => item.id===id ? { ...item, quantity:Math.max(0,item.quantity+delta) } : item).filter((item)=>item.quantity>0) })); }
  function newOrder() { const next=createTransaction(); setTransactions((current)=>[...current,next]); setActiveId(next.id); setShowPayment(false); setMessage(""); }
  function removeOrder(id:string) { setTransactions((current)=>{ const remaining=current.filter((item)=>item.id!==id); if(remaining.length) { if(id===activeId)setActiveId(remaining[0].id); return remaining; } const fresh=createTransaction(); setActiveId(fresh.id); return [fresh]; }); }
  function updatePayment(id:string, patch:Partial<Transaction["payments"][number]>) { updateActive((transaction)=>({...transaction,payments:transaction.payments.map((item)=>item.id===id?{...item,...patch}:item)})); }
  function addPayment() { updateActive((transaction)=>({...transaction,payments:[...transaction.payments,{id:crypto.randomUUID(),method:"Cash",amount:Math.max(0,total-paid),reference:""}]})); }
  function removePayment(id:string) { updateActive((transaction)=>({...transaction,payments:transaction.payments.length===1?transaction.payments:transaction.payments.filter((item)=>item.id!==id)})); }

  async function checkout() {
    if (!active) return;
    setMessage("");
    if (!active.customerId) return setMessage("Select a customer before completing the sale.");
    if (!active.items.length) return setMessage("Add at least one product to the cart.");
    const creditOnly = active.payments.every((item)=>item.method === "Credit");
    if (!creditOnly && paid + 0.005 < total) return setMessage(`Payment is short by ${money(total-paid)}.`);
    for (const line of active.items) { const product=products.find((item)=>item.id===line.productId); if(!product)return setMessage("A selected product no longer exists."); if(line.quantity>product.quantity)return setMessage(`${product.itemName} only has ${product.quantity} unit(s) available.`); }
    setProcessing(true);
    try {
      const draftId=active.id;
      await saleService.create({ id:draftId, invoiceNumber:active.invoiceNumber, customerId:active.customerId, date:new Date().toISOString().slice(0,10), subtotal, discountAmount, taxAmount, total, amountPaid:paid, balanceDue:balance, paymentStatus:balance<=0?"Paid":paid>0?"Partially Paid":"Unpaid", paymentMethod:active.payments.map((item)=>item.method).join(" + "), status:"Draft" });
      await saleItemService.createMany(active.items.map((item)=>({ id:crypto.randomUUID(), saleId:draftId, productId:item.productId, quantity:item.quantity, unitPrice:item.unitPrice, total:item.quantity*item.unitPrice })));
      const posted=await completeSale(draftId);
      await loadCatalog(); await loadSales();
      removeOrder(draftId); setShowPayment(false); setMessage(`Sale ${posted.invoiceNumber} completed successfully.`);
    } catch(error) { setMessage(error instanceof Error?error.message:"Unable to complete sale."); } finally { setProcessing(false); }
  }

  const completedSales=sales.filter((sale)=>sale.status==="Completed");
  const today=new Date().toISOString().slice(0,10);
  const todaySales=completedSales.filter((sale)=>sale.date===today).reduce((sum,sale)=>sum+sale.total,0);
  const filteredHistory=sales.filter((sale)=>{const query=historySearch.trim().toLowerCase(); return !query || sale.invoiceNumber.toLowerCase().includes(query) || sale.customerId.toLowerCase().includes(query);});

  return <div className="min-h-full space-y-5 pb-10"><header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Sales workspace</p><h1 className="mt-1 text-3xl font-bold text-slate-900">Sales & POS</h1><p className="mt-1 text-sm text-slate-500">Atomic checkout, live stock and sequential invoices.</p></div><div className="flex gap-2"><button onClick={()=>setShowHistory(true)} className="rounded-xl border bg-white px-4 py-2.5 text-sm font-semibold">Sales history</button><button onClick={newOrder} className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">New order</button></div></header>
    <div className="grid gap-3 sm:grid-cols-3"><div className="rounded-2xl border bg-white p-4"><p className="text-xs uppercase text-slate-400">Today</p><p className="mt-2 text-2xl font-bold">{money(todaySales)}</p></div><div className="rounded-2xl border bg-white p-4"><p className="text-xs uppercase text-slate-400">Invoices</p><p className="mt-2 text-2xl font-bold">{sales.length}</p></div><div className="rounded-2xl border bg-white p-4"><p className="text-xs uppercase text-slate-400">Open carts</p><p className="mt-2 text-2xl font-bold">{transactions.length}</p></div></div>
    <div className="grid gap-5 xl:grid-cols-[1.4fr_0.8fr]"><section className="rounded-3xl border bg-white p-4 shadow-sm"><div className="flex flex-wrap gap-2 border-b pb-4">{transactions.map((item,index)=><button key={item.id} onClick={()=>setActiveId(item.id)} className={`rounded-xl px-3 py-2 text-xs font-semibold ${item.id===active?.id?"bg-slate-900 text-white":"bg-slate-100 text-slate-600"}`}>Order {index+1} · {item.invoiceNumber}</button>)}</div><div className="relative mt-4"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18}/><input value={search} onChange={(event)=>setSearch(event.target.value)} onKeyDown={(event)=>{if(event.key==="Enter"&&filteredProducts[0])addProduct(filteredProducts[0]);}} className="w-full rounded-2xl border bg-slate-50 py-3 pl-10 pr-12 outline-none focus:bg-white" placeholder="Search product, SKU or scan barcode"/><Barcode className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18}/></div><div className="mt-3 flex gap-2 overflow-x-auto">{categories.map((item)=><button key={item} onClick={()=>setCategory(item)} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${category===item?"bg-slate-900 text-white":"bg-slate-100 text-slate-600"}`}>{item}</button>)}</div><div className="mt-4 grid max-h-[520px] grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-3 lg:grid-cols-4">{filteredProducts.map((product)=><button key={product.id} disabled={product.quantity<=0} onClick={()=>addProduct(product)} className="rounded-2xl border p-3 text-left transition hover:-translate-y-0.5 hover:shadow-md disabled:opacity-40"><div className="grid h-20 place-items-center rounded-xl bg-slate-100 text-slate-400"><ShoppingCart size={25}/></div><p className="mt-2 line-clamp-2 text-sm font-semibold">{product.itemName}</p><p className="mt-1 text-xs text-slate-400">{product.sku||product.barcode||"No code"}</p><div className="mt-2 flex justify-between"><b>{money(product.sellingPrice)}</b><span className="text-xs text-slate-400">{product.quantity} left</span></div></button>)}{!filteredProducts.length&&<div className="col-span-full p-10 text-center text-sm text-slate-500">No products found.</div>}</div></section>
      <section className="flex min-h-[620px] flex-col rounded-3xl bg-slate-950 text-white shadow-xl"><div className="border-b border-white/10 p-4"><div className="flex items-center justify-between"><div><p className="text-xs uppercase tracking-wider text-slate-400">Current invoice</p><h2 className="mt-1 text-xl font-bold">{active?.invoiceNumber}</h2></div><button onClick={()=>active&&removeOrder(active.id)} className="rounded-xl p-2 text-slate-400 hover:bg-white/10"><Trash2 size={18}/></button></div></div><div className="flex-1 overflow-y-auto p-4 space-y-2">{active?.items.map((line)=><div key={line.id} className="rounded-2xl border border-white/10 bg-white/5 p-3"><div className="flex justify-between gap-3"><div><p className="text-sm font-semibold">{products.find((p)=>p.id===line.productId)?.itemName??"Unknown product"}</p><p className="text-xs text-slate-400">{money(line.unitPrice)}</p></div><b>{money(line.unitPrice*line.quantity)}</b></div><div className="mt-3 flex items-center justify-between"><div className="flex items-center gap-2 rounded-xl bg-white/5 p-1"><button onClick={()=>changeQuantity(line.id,-1)} className="rounded-lg p-1.5"><Minus size={14}/></button><span className="min-w-6 text-center">{line.quantity}</span><button onClick={()=>changeQuantity(line.id,1)} className="rounded-lg p-1.5"><Plus size={14}/></button></div><button onClick={()=>updateActive((transaction)=>({...transaction,items:transaction.items.filter((item)=>item.id!==line.id)}))} className="text-xs text-slate-400 hover:text-red-300">Remove</button></div></div>)}{!active?.items.length&&<div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm text-slate-500">Cart is ready. Select a product.</div>}</div><div className="border-t border-white/10 p-4"><div className="flex items-center gap-2"><UserRound size={17} className="text-slate-400"/><select value={active?.customerId??""} onChange={(event)=>updateActive((transaction)=>({...transaction,customerId:event.target.value}))} className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none"><option value="" className="text-slate-900">Select customer</option>{customers.map((customer)=><option key={customer.id} value={customer.id} className="text-slate-900">{customer.name}</option>)}</select></div><div className="mt-4 space-y-2 text-sm"><div className="flex justify-between text-slate-400"><span>Subtotal</span><span>{money(subtotal)}</span></div><div className="flex justify-between text-slate-400"><span>Discount</span><span>-{money(discountAmount)}</span></div><div className="flex justify-between text-slate-400"><span>Tax</span><span>{money(taxAmount)}</span></div><div className="flex justify-between border-t border-white/10 pt-3 text-lg font-bold"><span>Total</span><span>{money(total)}</span></div></div><button disabled={processing||!active?.items.length} onClick={()=>setShowPayment(true)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3.5 text-sm font-bold text-slate-950 disabled:opacity-40"><WalletCards size={18}/> Continue to payment</button></div></section></div>
    {message&&<div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">{message}</div>}
    {showPayment&&active&&<div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4" onMouseDown={()=>!processing&&setShowPayment(false)}><div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 text-slate-900 shadow-2xl" onMouseDown={(event)=>event.stopPropagation()}><div className="flex justify-between"><div><p className="text-xs uppercase text-slate-400">Checkout</p><h2 className="text-2xl font-bold">{active.invoiceNumber}</h2></div><button onClick={()=>setShowPayment(false)}><X/></button></div><div className="mt-4 rounded-2xl bg-slate-950 p-5 text-white"><p className="text-xs text-slate-400">Amount due</p><p className="text-4xl font-bold">{money(total)}</p><div className="mt-2 flex justify-between text-sm"><span>Paid {money(paid)}</span><span>Balance {money(balance)}</span></div></div><div className="mt-5 space-y-3">{active.payments.map((payment)=><div key={payment.id} className="grid gap-3 rounded-2xl border p-4 md:grid-cols-[1fr_1fr_1fr_auto]"><select value={payment.method} onChange={(event)=>updatePayment(payment.id,{method:event.target.value as SalePaymentMethod})} className="rounded-xl border p-3">{paymentMethods.map((method)=><option key={method}>{method}</option>)}</select><input type="number" min="0" value={payment.amount} onChange={(event)=>updatePayment(payment.id,{amount:Number(event.target.value)||0})} className="rounded-xl border p-3"/><input value={payment.reference} onChange={(event)=>updatePayment(payment.id,{reference:event.target.value})} className="rounded-xl border p-3" placeholder="Reference"/><button disabled={active.payments.length===1} onClick={()=>removePayment(payment.id)} className="rounded-xl text-slate-400"><Trash2 size={18}/></button></div>)}<button onClick={addPayment} className="rounded-xl border border-dashed px-4 py-2 text-sm font-semibold">+ Split payment</button></div>{change>0&&<p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">Change due: {money(change)}</p>}<button disabled={processing} onClick={()=>void checkout()} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-4 font-bold text-white disabled:opacity-50"><CreditCard size={18}/>{processing?"Posting transaction...":"Validate & complete sale"}</button></div></div>}
    {showHistory&&<div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4" onMouseDown={()=>setShowHistory(false)}><div className="max-h-[88vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white p-6 text-slate-900" onMouseDown={(event)=>event.stopPropagation()}><div className="flex justify-between"><div><h2 className="text-2xl font-bold">Sales history</h2><p className="text-sm text-slate-500">Search posted invoices.</p></div><button onClick={()=>setShowHistory(false)}><X/></button></div><div className="relative mt-4"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18}/><input value={historySearch} onChange={(event)=>setHistorySearch(event.target.value)} className="w-full rounded-xl border bg-slate-50 p-3 pl-10" placeholder="Invoice or customer"/></div><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[700px] text-sm"><thead className="bg-slate-50"><tr><th className="p-3 text-left">Invoice</th><th className="p-3 text-left">Customer</th><th className="p-3 text-left">Date</th><th className="p-3 text-right">Total</th><th className="p-3 text-left">Status</th></tr></thead><tbody>{filteredHistory.map((sale)=><tr key={sale.id} className="border-t"><td className="p-3 font-semibold">{sale.invoiceNumber}</td><td className="p-3">{customers.find((c)=>c.id===sale.customerId)?.name??"Walk-in"}</td><td className="p-3">{sale.date}</td><td className="p-3 text-right font-semibold">{money(sale.total)}</td><td className="p-3">{sale.status}</td></tr>)}</tbody></table></div></div></div>}
  </div>;
}
