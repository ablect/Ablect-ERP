import TableContainer from "../../../components/ui/TableContainer";

import InventorySearch from "./InventorySearch";
import ProductResults from "./ProductResults";
import ProductTable from "./ProductTable";
import InventoryQuickInfo from "./InventoryQuickInfo";
import ProductSort from "./ProductSort";
import ProductPagination
from "./ProductPagination";
import { useProductCount } from "../hooks/useProductCount";
import BulkSelectionInfo
from "./BulkSelectionInfo";
export default function InventoryContent() {

  const {

    count,

  } = useProductCount();

  return (

    <div className="space-y-6">

      <InventorySearch />

      <ProductResults

        count={count}

      />
        <BulkSelectionInfo />
      <TableContainer>

        <ProductTable />
        
      <ProductPagination />
        <ProductSort />
        <InventoryQuickInfo />
      </TableContainer>

    </div>

  );

}