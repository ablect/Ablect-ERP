import { Users } from "lucide-react";

export default function Customers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users size={28} />
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-gray-500">Manage customer records and relationships.</p>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-8 text-center text-gray-500">
        Customer engine connected. Full CRM integration comes in Stage 11.
      </div>
    </div>
  );
}