import { useMemo, useState } from "react";
import { Plus, Search, Users, UserCheck, UserX } from "lucide-react";

import PageContainer from "../components/ui/PageContainer";
import SectionTitle from "../components/ui/SectionTitle";

import { useCustomerStore } from "../modules/crm/store/CustomerStore";
import type {
  Customer,
  CustomerType,
  CustomerStatus,
} from "../modules/crm/types/customer";
import {
  createCustomerCode,
  validateCustomer,
} from "../modules/crm/services/CustomerService";

export default function Customers() {
  const customers = useCustomerStore((state) => state.customers);
  const addCustomer = useCustomerStore((state) => state.addCustomer);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [type, setType] = useState<CustomerType>("individual");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const filteredCustomers = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return customers;
    }

    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(query) ||
        customer.customerCode.toLowerCase().includes(query) ||
        customer.phone.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query)
    );
  }, [customers, search]);

  const activeCustomers = customers.filter(
    (customer) => customer.status === "active"
  ).length;

  const prospects = customers.filter(
    (customer) => customer.status === "prospect"
  ).length;

  const inactiveCustomers = customers.filter(
    (customer) => customer.status === "inactive"
  ).length;

  function resetForm() {
    setName("");
    setType("individual");
    setPhone("");
    setEmail("");
    setAddress("");
    setCity("");
    setState("");
  }

  function handleCreateCustomer() {
    const customer: Partial<Customer> = {
      name,
      type,
      phone,
      email,
      address,
      city,
      state,
      status: "active" as CustomerStatus,
      creditLimit: 0,
      outstandingBalance: 0,
    };

    const errors = validateCustomer(customer);

    if (errors.length > 0) {
      window.alert(errors.join("\n"));
      return;
    }

    const now = new Date().toISOString();

    addCustomer({
      id: crypto.randomUUID(),
      customerCode: createCustomerCode(customers),
      name: name.trim(),
      type,
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      status: "active",
      creditLimit: 0,
      outstandingBalance: 0,
      createdAt: now,
      updatedAt: now,
    });

    resetForm();
    setShowForm(false);
  }

  return (
    <PageContainer>
      <div className="space-y-8">
        <SectionTitle
          title="Customers"
          subtitle="Manage customers, contacts and customer records."
        />

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-5">
            <div className="flex items-center gap-3">
              <Users size={24} />
              <div>
                <p className="text-sm text-gray-500">Total Customers</p>
                <h2 className="text-2xl font-semibold">
                  {customers.length}
                </h2>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <div className="flex items-center gap-3">
              <UserCheck size={24} />
              <div>
                <p className="text-sm text-gray-500">Active Customers</p>
                <h2 className="text-2xl font-semibold">
                  {activeCustomers}
                </h2>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <div className="flex items-center gap-3">
              <UserX size={24} />
              <div>
                <p className="text-sm text-gray-500">
                  Prospects / Inactive
                </p>
                <h2 className="text-2xl font-semibold">
                  {prospects + inactiveCustomers}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search customers..."
              className="w-full rounded-lg border py-2 pl-10 pr-4 outline-none focus:ring-2"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowForm((value) => !value)}
            className="flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2 text-white"
          >
            <Plus size={18} />
            Add Customer
          </button>
        </div>

        {/* Create customer form */}
        {showForm && (
          <div className="rounded-xl border bg-white p-6">
            <h2 className="mb-5 text-xl font-semibold">
              Create Customer
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Customer name *"
                className="rounded-lg border px-3 py-2"
              />

              <select
                value={type}
                onChange={(event) =>
                  setType(event.target.value as CustomerType)
                }
                className="rounded-lg border px-3 py-2"
              >
                <option value="individual">Individual</option>
                <option value="business">Business</option>
              </select>

              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Phone number *"
                className="rounded-lg border px-3 py-2"
              />

              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
                className="rounded-lg border px-3 py-2"
              />

              <input
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="Address"
                className="rounded-lg border px-3 py-2"
              />

              <input
                value={city}
                onChange={(event) => setCity(event.target.value)}
                placeholder="City"
                className="rounded-lg border px-3 py-2"
              />

              <input
                value={state}
                onChange={(event) => setState(event.target.value)}
                placeholder="State"
                className="rounded-lg border px-3 py-2"
              />
            </div>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={handleCreateCustomer}
                className="rounded-lg bg-black px-5 py-2 text-white"
              >
                Save Customer
              </button>

              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
                className="rounded-lg border px-5 py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Customer table */}
        <div className="overflow-hidden rounded-xl border bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">Code</th>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-right">Balance</th>
                </tr>
              </thead>

              <tbody>
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-gray-500"
                    >
                      No customers found.
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="border-b last:border-b-0"
                    >
                      <td className="px-4 py-3 font-medium">
                        {customer.customerCode}
                      </td>

                      <td className="px-4 py-3">
                        {customer.name}
                      </td>

                      <td className="px-4 py-3 capitalize">
                        {customer.type}
                      </td>

                      <td className="px-4 py-3">
                        {customer.phone}
                      </td>

                      <td className="px-4 py-3 capitalize">
                        {customer.status}
                      </td>

                      <td className="px-4 py-3 text-right">
                        {customer.outstandingBalance.toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}