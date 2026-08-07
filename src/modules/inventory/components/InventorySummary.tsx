import Grid from "../../../components/layout/Grid";
import ProductCount
from "./ProductCount";
import InventorySummaryCard from "./InventorySummaryCard";
import SelectedProductCount
from "./SelectedProductCount";
import {

  useInventorySummary,

} from "../hooks/useInventorySummary";

export default function InventorySummary() {

  const {

    inStock,

    lowStock,

    outOfStock,

  } = useInventorySummary();

  return (

    <Grid>

      <InventorySummaryCard

        title="In Stock"

        value={inStock}

      />

      <InventorySummaryCard

        title="Low Stock"

        value={lowStock}

      />

      <InventorySummaryCard

        title="Out of Stock"

        value={outOfStock}

      />
      <ProductCount />
      <SelectedProductCount />
    </Grid>

  );

}