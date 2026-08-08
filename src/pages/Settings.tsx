import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <SettingsIcon size={28} />
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-500">System configuration and business preferences.</p>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-8 text-center text-gray-500">
        Settings engine connected. User, role and company settings come in later stages.
      </div>
    </div>
  );
}