import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, Printer, ShieldCheck, Store } from "lucide-react";
import { requireDesktopApi } from "../../lib/desktopApi";

export default function FirstRunWizard({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [printerName, setPrinterName] = useState("Xprinter");
  const [connection, setConnection] = useState("USB");
  const [address, setAddress] = useState("");
  const [productName, setProductName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("0");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void requireDesktopApi().setup.status().then((status) => {
      if (status.businessName) setBusinessName(status.businessName);
    });
  }, []);

  function next() {
    setError("");
    if (step === 1 && !businessName.trim()) return setError("Enter the client's business name.");
    if (step === 2 && (!fullName.trim() || !email.trim() || password.length < 10 || password !== confirm)) return setError("Enter administrator details and a matching password of at least 10 characters.");
    setStep((value) => Math.min(4, value + 1));
  }

  async function finish(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!productName.trim()) return setError("Add the first product name.");
    setSaving(true);
    try {
      const api = requireDesktopApi();
      await api.setup.complete({ businessName, fullName, email, password, printerName, connection, address });
      await api.erp.products.create({ itemName: productName, sku: sku || undefined, category: "General", unit: "PCS", unitCost: 0, sellingPrice: Number(price || 0), quantity: Number(quantity || 0), reorderLevel: 5 });
      onComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Setup could not be completed.");
    } finally { setSaving(false); }
  }

  return <main className="min-h-screen bg-slate-950 p-5 text-white sm:p-10"><div className="mx-auto max-w-3xl"><div className="mb-8 flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-slate-950"><Store size={22}/></div><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">ABLECT TECHNOLOGIES LTD</p><h1 className="text-2xl font-bold">First-run setup</h1></div></div><div className="rounded-3xl bg-white p-6 text-slate-900 shadow-2xl sm:p-9"><div className="mb-8 grid grid-cols-4 gap-2">{[1,2,3,4].map((item)=><div key={item} className={`h-1.5 rounded-full ${item<=step?"bg-slate-900":"bg-slate-200"}`}/>)}</div>{step===1&&<section><h2 className="text-2xl font-bold">Business profile</h2><p className="mt-1 text-sm text-slate-500">This name appears on the login screen and receipts.</p><label className="mt-6 block text-sm font-semibold">Client business name<input value={businessName} onChange={e=>setBusinessName(e.target.value)} className="mt-2 w-full rounded-xl border p-3" placeholder="Hotel, Supermarket, Pharmacy..."/></label></section>}{step===2&&<section><h2 className="text-2xl font-bold">Administrator account</h2><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold">Full name<input value={fullName} onChange={e=>setFullName(e.target.value)} className="mt-2 w-full rounded-xl border p-3"/></label><label className="text-sm font-semibold">Email / username<input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full rounded-xl border p-3"/></label><label className="text-sm font-semibold">Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full rounded-xl border p-3"/></label><label className="text-sm font-semibold">Confirm password<input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} className="mt-2 w-full rounded-xl border p-3"/></label></div><p className="mt-3 flex gap-2 text-xs text-slate-500"><ShieldCheck size={15}/> Passwords are stored using salted scrypt hashes.</p></section>}{step===3&&<section><h2 className="text-2xl font-bold">Receipt printer</h2><p className="mt-1 text-sm text-slate-500">Configure the first Xprinter. You can change it later.</p><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold">Printer name<input value={printerName} onChange={e=>setPrinterName(e.target.value)} className="mt-2 w-full rounded-xl border p-3"/></label><label className="text-sm font-semibold">Connection<select value={connection} onChange={e=>setConnection(e.target.value)} className="mt-2 w-full rounded-xl border p-3"><option>USB</option><option>TCP/IP</option><option>Bluetooth</option></select></label></div>{connection!=="USB"&&<label className="mt-4 block text-sm font-semibold">IP / address<input value={address} onChange={e=>setAddress(e.target.value)} className="mt-2 w-full rounded-xl border p-3" placeholder="192.168.1.100"/></label>}<div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600"><Printer className="mb-2" size={20}/> The saved printer profile is kept in the Windows user data directory, not in the application binaries.</div></section>}{step===4&&<form onSubmit={finish}><h2 className="text-2xl font-bold">First product</h2><p className="mt-1 text-sm text-slate-500">You can add the rest from Inventory after setup.</p><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold">Product name<input required value={productName} onChange={e=>setProductName(e.target.value)} className="mt-2 w-full rounded-xl border p-3"/></label><label className="text-sm font-semibold">SKU / barcode<input value={sku} onChange={e=>setSku(e.target.value)} className="mt-2 w-full rounded-xl border p-3"/></label><label className="text-sm font-semibold">Selling price<input type="number" min="0" value={price} onChange={e=>setPrice(e.target.value)} className="mt-2 w-full rounded-xl border p-3"/></label><label className="text-sm font-semibold">Opening quantity<input type="number" min="0" value={quantity} onChange={e=>setQuantity(e.target.value)} className="mt-2 w-full rounded-xl border p-3"/></label></div></form>}{error&&<div className="mt-6 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">{error}</div>}<div className="mt-8 flex justify-between"><button type="button" disabled={saving||step===1} onClick={()=>setStep(value=>value-1)} className="rounded-xl border px-4 py-3 text-sm font-semibold disabled:opacity-30">Back</button>{step<4?<button type="button" onClick={next} className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white">Continue</button>:<button type="button" onClick={finish} disabled={saving} className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white disabled:opacity-50">{saving?"Finishing...":<><CheckCircle2 size={17}/> Finish setup</>}</button>}</div></div></div></main>;
}
