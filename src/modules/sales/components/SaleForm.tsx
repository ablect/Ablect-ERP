import { useState } from "react";

import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";

import { useCustomers } from "../../customers/hooks/useCustomers";

import { useCreateSale } from "../hooks/useCreateSale";
import { createSaleItem } from "../utils/createSaleItem";
import { saleItemService } from "../services/SaleItemService";
import { completeSale } from "../utils/completeSale";

type SaleLine = {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
};

export default function SaleForm() {
  const { customers } =
    useCustomers();

  const { create } =
    useCreateSale();

  const [invoiceNumber, setInvoiceNumber] =
    useState("");

  const [customerId, setCustomerId] =
    useState("");

  const [date, setDate] =
    useState(
      new Date()
        .toISOString()
        .slice(0, 10),
    );

  const [items, setItems] =
    useState<SaleLine[]>([
      {
        id: crypto.randomUUID(),
        productId: "",
        quantity: 1,
        unitPrice: 0,
      },
    ]);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const total =
    items.reduce(
      (sum, item) =>
        sum +
        item.quantity *
          item.unitPrice,
      0,
    );

  function updateItem(
    id: string,
    field: keyof SaleLine,
    value: string | number,
  ) {
    setItems(
      (previous) =>
        previous.map(
          (item) =>
            item.id === id
              ? {
                  ...item,
                  [field]:
                    value,
                }
              : item,
        ),
    );
  }

  function addItem() {
    setItems(
      (previous) => [
        ...previous,
        {
          id: crypto.randomUUID(),
          productId: "",
          quantity: 1,
          unitPrice: 0,
        },
      ],
    );
  }

  function removeItem(
    id: string,
  ) {
    setItems(
      (previous) =>
        previous.filter(
          (item) =>
            item.id !== id,
        ),
    );
  }

  async function save() {
    setError("");

    if (!invoiceNumber.trim()) {
      setError(
        "Invoice number is required.",
      );
      return;
    }

    if (!customerId) {
      setError(
        "Please select a customer.",
      );
      return;
    }

    if (items.length === 0) {
      setError(
        "Add at least one sale item.",
      );
      return;
    }

    const invalidItem =
      items.find(
        (item) =>
          !item.productId.trim() ||
          item.quantity <= 0 ||
          item.unitPrice < 0,
      );

    if (invalidItem) {
      setError(
        "Every item must have a product, a quantity greater than zero, and a valid price.",
      );
      return;
    }

    try {
      setSaving(true);

      /*
       * STEP 1
       * Create the sale as Draft.
       */
      const sale =
        await create(
          invoiceNumber.trim(),
          customerId,
          date,
          total,
        );

      /*
       * STEP 2
       * Convert the form lines into
       * persistent SaleItem records.
       */
      const saleItems =
        items.map(
          (item) =>
            createSaleItem(
              sale.id,
              item.productId.trim(),
              item.quantity,
              item.unitPrice,
            ),
        );

      /*
       * STEP 3
       * Save the sale items.
       */
      await saleItemService.createMany(
        saleItems,
      );

      /*
       * STEP 4
       * Complete the sale.
       *
       * completeSale() retrieves the
       * items from SaleItemService itself.
       * This keeps the business logic in
       * one place.
       */
      await completeSale(
        sale.id,
      );

      /*
       * STEP 5
       * Reset the form.
       */
      setInvoiceNumber("");

      setCustomerId("");

      setDate(
        new Date()
          .toISOString()
          .slice(0, 10),
      );

      setItems([
        {
          id: crypto.randomUUID(),
          productId: "",
          quantity: 1,
          unitPrice: 0,
        },
      ]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to complete sale.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">
            New Sale
          </h2>

          <p className="text-sm text-slate-500">
            Create and complete a customer
            sale.
          </p>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          <input
            className="rounded-lg border p-3"
            placeholder="Invoice Number"
            value={invoiceNumber}
            onChange={(e) =>
              setInvoiceNumber(
                e.target.value,
              )
            }
            disabled={saving}
          />

          <select
            className="rounded-lg border p-3"
            value={customerId}
            onChange={(e) =>
              setCustomerId(
                e.target.value,
              )
            }
            disabled={saving}
          >
            <option value="">
              Select Customer
            </option>

            {customers.map(
              (customer) => (
                <option
                  key={customer.id}
                  value={customer.id}
                >
                  {customer.name} -{" "}
                  {customer.phone}
                </option>
              ),
            )}
          </select>

          <input
            className="rounded-lg border p-3"
            type="date"
            value={date}
            onChange={(e) =>
              setDate(
                e.target.value,
              )
            }
            disabled={saving}
          />
        </div>

        {customers.length === 0 && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            No customers exist yet.
            Create a customer before
            recording a sale.
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              Sale Items
            </h3>

            <Button
              type="button"
              onClick={addItem}
              disabled={saving}
            >
              Add Item
            </Button>
          </div>

          {items.map(
            (item) => (
              <div
                key={item.id}
                className="grid gap-3 rounded-lg border p-4 md:grid-cols-5"
              >
                <input
                  className="rounded-lg border p-3"
                  placeholder="Product ID"
                  value={
                    item.productId
                  }
                  onChange={(e) =>
                    updateItem(
                      item.id,
                      "productId",
                      e.target.value,
                    )
                  }
                  disabled={saving}
                />

                <input
                  className="rounded-lg border p-3"
                  type="number"
                  min="1"
                  placeholder="Quantity"
                  value={
                    item.quantity
                  }
                  onChange={(e) =>
                    updateItem(
                      item.id,
                      "quantity",
                      Number(
                        e.target.value,
                      ),
                    )
                  }
                  disabled={saving}
                />

                <input
                  className="rounded-lg border p-3"
                  type="number"
                  min="0"
                  placeholder="Unit Price"
                  value={
                    item.unitPrice
                  }
                  onChange={(e) =>
                    updateItem(
                      item.id,
                      "unitPrice",
                      Number(
                        e.target.value,
                      ),
                    )
                  }
                  disabled={saving}
                />

                <div className="flex items-center font-medium">
                  ₦
                  {(
                    item.quantity *
                    item.unitPrice
                  ).toLocaleString()}
                </div>

                {items.length >
                  1 && (
                  <Button
                    type="button"
                    onClick={() =>
                      removeItem(
                        item.id,
                      )
                    }
                    disabled={
                      saving
                    }
                  >
                    Remove
                  </Button>
                )}
              </div>
            ),
          )}
        </div>

        <div className="flex items-center justify-between border-t pt-5">
          <div>
            <p className="text-sm text-slate-500">
              Total
            </p>

            <p className="text-2xl font-bold">
              ₦
              {total.toLocaleString()}
            </p>
          </div>

          <Button
            type="button"
            onClick={save}
            disabled={
              saving ||
              customers.length === 0
            }
          >
            {saving
              ? "Processing..."
              : "Complete Sale"}
          </Button>
        </div>
      </div>
    </Card>
  );
}