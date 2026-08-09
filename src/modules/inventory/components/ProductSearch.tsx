import { Search } from "lucide-react";
import type { ChangeEvent } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/** Presentational search control used by the inventory toolbar. */
export default function ProductSearch({ value, onChange, placeholder = "Search products..." }: Props) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value);

  return (
    <label className="relative block min-w-[240px]">
      <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
      <input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Search products"
        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50"
      />
    </label>
  );
}
