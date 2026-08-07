import { Search } from "lucide-react";

interface Props {
  placeholder?: string;
}

export default function SearchBox({
  placeholder = "Search..."
}: Props) {

  return (

    <div className="relative">

      <Search
        size={18}
        className="absolute left-3 top-3 text-slate-400"
      />

      <input
        className="border rounded-xl pl-10 pr-4 py-2 w-72"
        placeholder={placeholder}
      />

    </div>

  );

}