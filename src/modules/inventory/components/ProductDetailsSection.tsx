import ProductMeta from "./ProductMeta";

export default function ProductDetailsSection() {

  return (

    <div className="space-y-4">

      <ProductMeta

        label="Name"

        value="-"

      />

      <ProductMeta

        label="SKU"

        value="-"

      />

      <ProductMeta

        label="Brand"

        value="-"

      />

      <ProductMeta

        label="Category"

        value="-"

      />

    </div>

  );

}