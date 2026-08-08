import { useCustomers } from "../hooks/useCustomers";
import { useDeleteCustomer } from "../hooks/useDeleteCustomer";

export default function CustomerTable() {
  const { customers } =
    useCustomers();

  const { remove } =
    useDeleteCustomer();

  if (customers.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-12 text-center text-slate-500">
        No customers have been created.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-slate-50 text-left">
            <th className="p-4">
              Name
            </th>

            <th className="p-4">
              Phone
            </th>

            <th className="p-4">
              Email
            </th>

            <th className="p-4">
              Address
            </th>

            <th className="p-4">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {customers.map(
            (customer) => (
              <tr
                key={customer.id}
                className="border-b last:border-b-0"
              >
                <td className="p-4 font-medium">
                  {customer.name}
                </td>

                <td className="p-4">
                  {customer.phone}
                </td>

                <td className="p-4">
                  {customer.email ||
                    "—"}
                </td>

                <td className="p-4">
                  {customer.address ||
                    "—"}
                </td>

                <td className="p-4">
                  <button
                    type="button"
                    className="text-red-600 hover:underline"
                    onClick={() =>
                      void remove(
                        customer.id,
                      )
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}