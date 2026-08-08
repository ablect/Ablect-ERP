import { useState } from "react";

import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";

import { useCreateCustomer } from "../hooks/useCreateCustomer";

type Props = {
  onCreated?: () => void;
};

export default function CustomerForm({
  onCreated,
}: Props) {
  const { create } =
    useCreateCustomer();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  async function save() {
    setError("");

    if (!name.trim()) {
      setError(
        "Customer name is required.",
      );
      return;
    }

    if (!phone.trim()) {
      setError(
        "Customer phone is required.",
      );
      return;
    }

    try {
      setSaving(true);

      await create(
        name,
        email,
        phone,
        address,
      );

      setName("");
      setEmail("");
      setPhone("");
      setAddress("");

      onCreated?.();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create customer.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card>
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-semibold">
            New Customer
          </h2>

          <p className="text-sm text-slate-500">
            Add a customer to the system.
          </p>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <input
            className="rounded-lg border p-3"
            placeholder="Customer Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            disabled={saving}
          />

          <input
            className="rounded-lg border p-3"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            disabled={saving}
          />

          <input
            className="rounded-lg border p-3"
            placeholder="Phone"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            disabled={saving}
          />

          <input
            className="rounded-lg border p-3"
            placeholder="Address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            disabled={saving}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            onClick={save}
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "Save Customer"}
          </Button>
        </div>
      </div>
    </Card>
  );
}