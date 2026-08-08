import Card from "../../../components/ui/Card";
import type { Sale } from "../types/Sale";

type Props = {
  sales: Sale[];
};

export default function SalesTable({
  sales,
}: Props) {
  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">
            Sales History
          </h2>

          <p className="text-sm text-slate-500">
            All customer sales recorded in the system.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="px-4 py-3 font-semibold">
                  Invoice
                </th>

                <th className="px-4 py-3 font-semibold">
                  Customer
                </th>

                <th className="px-4 py-3 font-semibold">
                  Date
                </th>

                <th className="px-4 py-3 font-semibold">
                  Total
                </th>

                <th className="px-4 py-3 font-semibold">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {sales.map((sale) => (
                <tr
                  key={sale.id}
                  className="border-b last:border-0"
                >
                  <td className="px-4 py-3 font-medium">
                    {sale.invoiceNumber}
                  </td>

                  <td className="px-4 py-3">
                    {sale.customerId}
                  </td>

                  <td className="px-4 py-3">
                    {sale.date}
                  </td>

                  <td className="px-4 py-3 font-medium">
                    ₦{sale.total.toLocaleString()}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={
                        sale.status ===
                        "Completed"
                          ? "rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
                          : sale.status ===
                              "Cancelled"
                            ? "rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700"
                            : "rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700"
                      }
                    >
                      {sale.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}