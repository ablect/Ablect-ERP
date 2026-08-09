import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type SortingState } from "@tanstack/react-table";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, ChevronsUpDown, MoreHorizontal, Search, Users } from "lucide-react";
import { useMemo, useState } from "react";

import type { Customer, CustomerTier } from "../../modules/customers/types/Customer";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "CU";
}

function tierClasses(tier: CustomerTier = "Standard") {
  return {
    VIP: "bg-amber-50 text-amber-700 ring-amber-200",
    Wholesale: "bg-violet-50 text-violet-700 ring-violet-200",
    Loyal: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Standard: "bg-slate-50 text-slate-600 ring-slate-200",
  }[tier];
}

type CustomerTableProps = {
  customers: Customer[];
  onSelect: (customer: Customer) => void;
};

export default function CustomerTable({ customers, onSelect }: CustomerTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const columns = useMemo<ColumnDef<Customer>[]>(() => [
    {
      accessorKey: "name",
      header: "Customer",
      cell: ({ row }) => {
        const customer = row.original;
        return (
          <div className="flex min-w-[220px] items-center gap-3">
            {customer.avatarUrl ? (
              <img src={customer.avatarUrl} alt="" className="h-10 w-10 rounded-xl object-cover ring-2 ring-white shadow-sm" />
            ) : (
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-sky-100 to-violet-100 text-xs font-bold text-slate-700">
                {initials(customer.name)}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate font-semibold text-slate-900">{customer.name}</p>
              <p className="truncate text-xs text-slate-400">{customer.companyName || customer.customerCode}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "tier",
      header: "Tier",
      cell: ({ row }) => (
        <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${tierClasses(row.original.tier)}`}>
          {row.original.tier || "Standard"}
        </span>
      ),
    },
    {
      accessorKey: "phone",
      header: "Contact",
      cell: ({ row }) => (
        <div className="min-w-[150px]">
          <p className="font-medium text-slate-700">{row.original.phone || "No phone"}</p>
          <p className="truncate text-xs text-slate-400">{row.original.email || "No email"}</p>
        </div>
      ),
    },
    {
      accessorKey: "loyaltyPoints",
      header: "Loyalty",
      cell: ({ row }) => (
        <div className="min-w-[100px]">
          <p className="font-bold text-slate-900">{(row.original.loyaltyPoints ?? 0).toLocaleString()}</p>
          <p className="text-[11px] text-slate-400">points</p>
        </div>
      ),
    },
    {
      accessorKey: "outstandingBalance",
      header: "Balance",
      cell: ({ row }) => (
        <span className={row.original.outstandingBalance > 0 ? "font-bold text-rose-600" : "font-semibold text-emerald-600"}>
          ₦{Math.max(0, row.original.outstandingBalance).toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${row.original.status === "active" ? "bg-emerald-50 text-emerald-700" : row.original.status === "prospect" ? "bg-sky-50 text-sky-700" : "bg-slate-100 text-slate-500"}`}>
          {row.original.status}
        </span>
      ),
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      cell: ({ row }) => (
        <button type="button" onClick={() => onSelect(row.original)} className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
          <MoreHorizontal size={18} />
        </button>
      ),
    },
  ], [onSelect]);

  const table = useReactTable({
    data: customers,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-sky-50 text-sky-600"><Users size={20} /></div>
          <div>
            <h2 className="font-bold text-slate-900">Customer directory</h2>
            <p className="text-xs text-slate-400">Search, sort and open any customer in one click.</p>
          </div>
        </div>
        <div className="relative w-full max-w-sm">
          <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={globalFilter} onChange={(event) => setGlobalFilter(event.target.value)} placeholder="Search name, phone, code..." className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-50" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] text-sm">
          <thead className="bg-slate-50/80 text-xs uppercase tracking-wider text-slate-400">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sorted = header.column.getIsSorted();
                  return (
                    <th key={header.id} className="px-5 py-4 text-left font-bold">
                      {header.isPlaceholder ? null : (
                        <button type="button" disabled={!header.column.getCanSort()} onClick={header.column.getToggleSortingHandler()} className="inline-flex items-center gap-1.5 transition hover:text-slate-700">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {sorted === "asc" ? <ArrowUp size={13} /> : sorted === "desc" ? <ArrowDown size={13} /> : header.column.getCanSort() ? <ChevronsUpDown size={13} className="opacity-40" /> : null}
                        </button>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <motion.tr key={row.id} layout whileHover={{ backgroundColor: "#f8fbff" }} onClick={() => onSelect(row.original)} className="cursor-pointer border-t border-slate-100 transition">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-5 py-4 align-middle">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </motion.tr>
            ))}
            {!table.getRowModel().rows.length && (
              <tr><td colSpan={columns.length} className="px-6 py-16 text-center text-sm text-slate-400">No customers match your search.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>Showing {table.getRowModel().rows.length} of {customers.length} customers</span>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="rounded-lg border border-slate-200 px-3 py-1.5 font-semibold disabled:opacity-40">Previous</button>
          <span className="rounded-lg bg-slate-100 px-3 py-1.5 font-semibold">Page {table.getState().pagination.pageIndex + 1} / {Math.max(1, table.getPageCount())}</span>
          <button type="button" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="rounded-lg border border-slate-200 px-3 py-1.5 font-semibold disabled:opacity-40">Next</button>
        </div>
      </div>
    </div>
  );
}
