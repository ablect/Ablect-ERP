import {
  Download,
  Plus,
  Printer,
  Upload,
} from "lucide-react";

import SearchInput from "../../../components/ui/SearchInput";
import IconButton from "../../../components/ui/IconButton";
import PageActions from "../../../components/ui/PageActions";

import BulkDeleteButton from "./BulkDeleteButton";

import { useProductSearchStore } from "../store/ProductSearchStore";

export default function InventoryToolbar() {

  const {
    keyword,
    setKeyword,
  } = useProductSearchStore();

  return (

    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

      <div className="w-full lg:max-w-md">

        <SearchInput
          value={keyword}
          onChange={setKeyword}
        />

      </div>

      <PageActions>

        <BulkDeleteButton />

        <IconButton icon={<Plus size={18} />}>
          New Product
        </IconButton>

        <IconButton icon={<Upload size={18} />}>
          Import
        </IconButton>

        <IconButton icon={<Download size={18} />}>
          Export
        </IconButton>

        <IconButton icon={<Printer size={18} />}>
          Print
        </IconButton>

      </PageActions>

    </div>

  );
}