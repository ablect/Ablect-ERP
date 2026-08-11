import { useEffect, useState } from "react";
import { Copy, KeyRound, ShieldAlert } from "lucide-react";
import { requireDesktopApi } from "./lib/desktopApi";
import FirstRunWizard from "./components/setup/FirstRunWizard";
import App from "./App";

type LicenseState = { valid: boolean; reason: string; machineId?: string; expiresAt?: string };

export default function SystemGate() {
  const [license, setLicense] = useState<LicenseState | null>(null);
  const [setup, setSetup] = useState<{ needsSetup: boolean } | null>(null);

  async function refresh() {
    const api = requireDesktopApi();
    const [licenseStatus, setupStatus] = await Promise.all([api.license.status(), api.setup.status()]);
    setLicense(licenseStatus); setSetup(setupStatus);
  }

  useEffect(() => { void refresh(); }, []);

  if (!license || !setup) return <div className="grid min-h-screen place-items-center bg-slate-950 text-white">Starting Ablect Business Suite…</div>;
  if (!license.valid) return <LicenseRequired status={license} />;
  if (setup.needsSetup) return <FirstRunWizard onComplete={() => void refresh()} />;
  return <App />;
}

function LicenseRequired({ status }: { status: LicenseState }) {
  async function copy() { if (status.machineId) await navigator.clipboard?.writeText(status.machineId); }
  return <main className="grid min-h-screen place-items-center bg-slate-950 p-6 text-white"><section className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-red-500/15 text-red-300"><ShieldAlert size={27}/></div><h1 className="mt-6 text-2xl font-bold">License activation required</h1><p className="mt-2 text-sm leading-6 text-slate-400">This commercial installation is not activated. Contact ABLECT TECHNOLOGIES LTD with the machine ID below to receive a signed offline license file.</p><div className="mt-6 rounded-2xl bg-black/30 p-4"><p className="text-xs uppercase tracking-wider text-slate-500">Machine ID</p><p className="mt-2 break-all font-mono text-sm text-white">{status.machineId ?? "Unavailable"}</p></div><button onClick={copy} className="mt-4 flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-950"><Copy size={16}/> Copy machine ID</button><p className="mt-5 flex items-center gap-2 text-xs text-slate-500"><KeyRound size={14}/> Status: {status.reason}</p></section></main>;
}
