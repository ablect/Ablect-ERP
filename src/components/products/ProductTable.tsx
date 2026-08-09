import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, type ColumnDef, type SortingState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ChevronUp, PackageOpen } from "lucide-react";
import type { InventoryItem } from "../../modules/inventory/types/InventoryItem";

function money(value: number) { return `₦${Math.max(0, value).toLocaleString()}`; }
function statusClass(status: InventoryItem["status"]) { return status === "In Stock" ? "bg-emerald-50 text-emerald-700" : status === "Low Stock" ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"; }

type Props = { products: InventoryItem[]; selectedIds: string[]; onToggleSelect: (id: string) => void; onToggleAll: (checked: boolean) => void; onOpen: (product: InventoryItem) => void; };

export default function ProductTable({ products, selectedIds, onToggleSelect, onToggleAll, onOpen }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const allSelected = products.length > 0 && products.every((item) => selectedIds.includes(item.id));
  const columns = useMemo<ColumnDef<InventoryItem>[]>(() => [
    { id: "select", enableSorting: false, header: () => <input type="checkbox" checked={allSelected} onChange={(event) => onToggleAll(event.target.checked)} className="h-4 w-4 accent-indigo-600" />, cell: ({ row }) => <input type="checkbox" checked={selectedIds.includes(row.original.id)} onChange={() => onToggleSelect(row.original.id)} onClick={(event) => event.stopPropagation()} className="h-4 w-4 accent-indigo-600" /> },
    { accessorKey: "itemName", header: "Product", cell: ({ row }) => <div className="flex min-w-[240px] items-center gap-3"><div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-indigo-50">{row.original.imageUrl ? <img src={row.original.imageUrl} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-indigo-300"><PackageOpen size={18} /></div>}</div><div className="min-w-0"><p className="truncate font-bold text-slate-900">{row.original.itemName}</p><p className="truncate text-xs text-slate-400">{row.original.brand || "No brand"}</p></div></div> },
    { accessorKey: "sku", header: "SKU", cell: ({ getValue }) => <span className="font-mono text-xs font-semibold text-slate-500">{String(getValue())}</span> },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "quantity", header: "Stock", cell: ({ row }) => <span className="font-black text-slate-800">{row.original.quantity.toLocaleString()} <span className="text-xs font-semibold text-slate-400">{row.original.unit}</span></span> },
    { accessorKey: "unitCost", header: "Cost", cell: ({ getValue }) => money(Number(getValue())) },
    { accessorKey: "sellingPrice", header: "Selling", cell: ({ getValue }) => <span className="font-black text-slate-900">{money(Number(getValue()))}</span> },
    { accessorKey: "status", header: "Status", cell: ({ getValue }) => <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${statusClass(getValue() as InventoryItem["status"])}`}>{String(getValue())}</span> },
  ], [allSelected, onToggleAll, onToggleSelect, selectedIds]);
  const table = useReactTable({ data: products, columns, state: { sorting }, onSortingChange: setSorting, getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel() });
  if (!products.length) return <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center"><PackageOpen className="mx-auto text-slate-300" size={44} /><h2 className="mt-4 text-lg font-black">No products found</h2></div>;
  return <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"><div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><p className="text-sm font-bold text-slate-800">Catalog data grid</p><span className="text-xs font-semibold text-slate-400">{products.length.toLocaleString()} rows</span></div><div className="overflow-x-auto"><table className="w-full min-w-[1000px] text-sm"><thead className="bg-slate-50 text-left text-[11px] font-black uppercase tracking-wider text-slate-400">{table.getHeaderGroups().map((group) => <tr key={group.id}>{group.headers.map((header) => <th key={header.id} className="px-4 py-3">{header.isPlaceholder ? null : header.id === "select" ? flexRender(header.column.columnDef.header, header.getContext()) : <button disabled={!header.column.getCanSort()} onClick={header.column.getToggleSortingHandler()} className="inline-flex items-center gap-1">{flexRender(header.column.columnDef.header, header.getContext())}{header.column.getIsSorted() === "asc" ? <ArrowUp size={12} /> : header.column.getIsSorted() === "desc" ? <ArrowDown size={12} /> : header.column.getCanSort() ? <ChevronUp size={12} className="opacity-30" /> : null}</button>}</th>)}</tr>)}</thead><tbody>{table.getRowModel().rows.map((row) => <tr key={row.id} onClick={() => onOpen(row.original)} className="cursor-pointer border-t border-slate-100 transition hover:bg-indigo-50/40">{row.getVisibleCells().map((cell) => <td key={cell.id} className="px-4 py-4">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>)}</tr>)}</tbody></table></div></div>;
}
