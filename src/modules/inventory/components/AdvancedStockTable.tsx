import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { motion } from "framer-motion";
import { AlertTriangle, Check, Edit3, PackageSearch, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import type { InventoryItem } from "../types/InventoryItem";

export type StockTableFilters = {
  search: string;
  status: "All" | InventoryItem["status"];
  category: string;
};

type AdvancedStockTableProps = {
  items: InventoryItem[];
  filters: StockTableFilters;
  onFiltersChange: (filters: StockTableFilters) => void;
  onSelectItem: (item: InventoryItem) => void;
  onUpdateQuantity: (item: InventoryItem, quantity: number) => Promise<void>;
  onScan: () => void;
};

function money(value: number) {
  return `₦${Math.max(0, value).toLocaleString()}`;
}

export default function AdvancedStockTable({ items, filters, onFiltersChange, onSelectItem, onUpdateQuantity, onScan }: AdvancedStockTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftQuantity, setDraftQuantity] = useState(0);

  const filtered = useMemo(() => {
    const query = filters.search.trim().toLowerCase();
    return items.filter((item) => {
      const matchesSearch = !query || item.itemName.toLowerCase().includes(query) || item.sku.toLowerCase().includes(query) || item.id.toLowerCase().includes(query);
      const matchesStatus = filters.status === "All" || item.status === filters.status;
      const matchesCategory = filters.category === "All" || item.category === filters.category;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [filters, items]);

  const columns = useMemo<ColumnDef<InventoryItem>[]>(() => [
    {
      accessorKey: "itemName",
      header: "Item",
      cell: ({ row }) => {
        const item = row.original;
        return <button className="flex min-w-0 items-center gap-3 text-left" onClick={() => onSelectItem(item)}><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-slate-300 ring-1 ring-white/[0.08]"><PackageSearch size={18} /></div><div className="min-w-0"><p className="truncate font-semibold text-slate-100">{item.itemName}</p><p className="mt-0.5 truncate text-xs text-slate-500">{item.sku} · {item.unit}</p></div></button>;
      },
    },
    { accessorKey: "category", header: "Category", cell: ({ getValue }) => <span className="text-slate-400">{String(getValue() || "Uncategorised")}</span> },
    { accessorKey: "warehouse", header: "Location", cell: ({ getValue }) => <span className="text-slate-400">{String(getValue() || "Unassigned")}</span> },
    {
      accessorKey: "quantity",
      header: "On hand",
      cell: ({ row }) => {
        const item = row.original;
        const editing = editingId === item.id;
        return editing ? <div className="flex items-center gap-1" onClick={(event) => event.stopPropagation()}><input autoFocus type="number" min={0} value={draftQuantity} onChange={(event) => setDraftQuantity(Math.max(0, Number(event.target.value)))} onKeyDown={(event) => { if (event.key === "Enter") void onUpdateQuantity(item, draftQuantity).then(() => setEditingId(null)); if (event.key === "Escape") setEditingId(null); }} className="w-24 rounded-lg border border-indigo-400/40 bg-slate-950 px-2 py-1.5 text-sm font-semibold text-white outline-none ring-2 ring-indigo-500/10" /><button className="rounded-lg p-1.5 text-emerald-300 hover:bg-emerald-400/10" onClick={() => void onUpdateQuantity(item, draftQuantity).then(() => setEditingId(null))}><Check size={15} /></button><button className="rounded-lg p-1.5 text-slate-500 hover:bg-white/5 hover:text-white" onClick={() => setEditingId(null)}><X size={15} /></button></div> : <button className="group/qty inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-left hover:bg-white/[0.05]" onClick={(event) => { event.stopPropagation(); setEditingId(item.id); setDraftQuantity(item.quantity); }}><span className={`font-semibold ${item.quantity <= item.reorderLevel ? "text-amber-300" : "text-slate-100"}`}>{item.quantity}</span><Edit3 size={13} className="text-slate-600 opacity-0 transition group-hover/qty:opacity-100" /></button>;
      },
    },
    { accessorKey: "reorderLevel", header: "Reorder", cell: ({ getValue }) => <span className="text-slate-500">{String(getValue())}</span> },
    { accessorKey: "sellingPrice", header: "Sell price", cell: ({ getValue }) => <span className="font-medium text-slate-200">{money(Number(getValue()))}</span> },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const item = row.original;
        const low = item.quantity <= item.reorderLevel && item.quantity > 0;
        return <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-2.5 py-1 text-xs font-semibold text-slate-300"><span className={`h-1.5 w-1.5 rounded-full ${item.status === "Out of Stock" ? "bg-slate-500" : low ? "animate-pulse bg-amber-300" : "bg-emerald-400"}`} />{item.status}</span>;
      },
    },
  ], [draftQuantity, editingId, onSelectItem, onUpdateQuantity]);

  const table = useReactTable({ data: filtered, columns, getCoreRowModel: getCoreRowModel() });

  return <section className="overflow-hidden rounded-3xl border border-white/[0.07] bg-[#16181D] shadow-2xl shadow-black/20">
    <div className="flex flex-col gap-3 border-b border-white/[0.06] p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 flex-1 items-center gap-2"><div className="relative min-w-0 flex-1 lg:max-w-md"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" /><input value={filters.search} onChange={(event) => onFiltersChange({ ...filters, search: event.target.value })} placeholder="Search SKU, product or ID..." className="w-full rounded-xl border border-white/[0.07] bg-[#0F1115] py-2.5 pl-9 pr-3 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-indigo-400/40 focus:ring-4 focus:ring-indigo-500/10" /></div><button onClick={onScan} className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-white/[0.07]">Scan</button></div>
      <div className="flex gap-2 overflow-x-auto">{(["All", "In Stock", "Low Stock", "Out of Stock"] as const).map((status) => <button key={status} onClick={() => onFiltersChange({ ...filters, status })} className={`shrink-0 rounded-xl px-3 py-2 text-xs font-semibold transition ${filters.status === status ? "bg-indigo-500/15 text-indigo-200 ring-1 ring-indigo-400/20" : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-300"}`}>{status}</button>)}</div>
    </div>
    <div className="overflow-auto"><table className="w-full min-w-[980px] border-collapse text-sm"><thead className="sticky top-0 z-10 bg-[#16181D]/95 backdrop-blur-xl">{table.getHeaderGroups().map((group) => <tr key={group.id} className="border-b border-white/[0.06] text-left text-[11px] uppercase tracking-[0.12em] text-slate-600">{group.headers.map((header) => <th key={header.id} className="px-4 py-3 font-semibold">{flexRender(header.column.columnDef.header, header.getContext())}</th>)}</tr>)}</thead><tbody>{table.getRowModel().rows.map((row) => <motion.tr key={row.id} layout initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.16 }} onClick={() => onSelectItem(row.original)} className="group cursor-pointer border-b border-white/[0.045] transition-colors hover:bg-white/[0.025]">{row.getVisibleCells().map((cell) => <td key={cell.id} className="px-4 py-3.5 align-middle">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>)}</motion.tr>)}</tbody></table>{filtered.length === 0 && <div className="flex min-h-56 flex-col items-center justify-center gap-3 text-center"><div className="rounded-2xl bg-white/[0.04] p-4 text-slate-600"><PackageSearch /></div><div><p className="font-semibold text-slate-300">No inventory matches</p><p className="mt-1 text-xs text-slate-600">Try a different search or filter.</p></div></div>}</div>
    <div className="flex items-center justify-between border-t border-white/[0.05] px-4 py-3 text-xs text-slate-600"><span>{filtered.length.toLocaleString()} items shown</span><span className="inline-flex items-center gap-1.5"><AlertTriangle size={13} /> Low stock is highlighted softly</span></div>
  </section>;
}
