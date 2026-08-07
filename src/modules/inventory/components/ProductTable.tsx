import { usePaginatedProducts } from "../hooks/usePaginatedProducts";

import ProductEmptyState from "./ProductEmptyState";
import ProductActions from "./ProductActions";
import ProductAvatar from "./ProductAvatar";
import ProductPrice from "./ProductPrice";
import ProductQuantity from "./ProductQuantity";
import StockBadge from "./StockBadge";

export default function ProductTable() {

  const { products } = usePaginatedProducts();

  if (products.length === 0) {

    return <ProductEmptyState />;

  }

  return (

    <div className="overflow-x-auto rounded-xl border">

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-3 text-left">
              Product
            </th>

            <th className="p-3 text-left">
              SKU
            </th>

            <th className="p-3 text-left">
              Price
            </th>

            <th className="p-3 text-left">
              Quantity
            </th>

            <th className="p-3 text-left">
              Status
            </th>

            <th className="p-3 text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr
              key={product.id}
              className="border-t hover:bg-slate-50"
            >

              <td className="p-3">

                <div className="flex items-center gap-3">

                  <ProductAvatar
                    name={product.name}
                  />

                  <span>

                    {product.name}

                  </span>

                </div>

              </td>

              <td className="p-3">

                {product.sku}

              </td>

              <td className="p-3">

                <ProductPrice
                  value={product.sellingPrice}
                />

              </td>

              <td className="p-3">

                <ProductQuantity
                  quantity={product.quantity}
                />

              </td>

              <td className="p-3">

                <StockBadge
                  quantity={product.quantity}
                />

              </td>

              <td className="p-3">

                <ProductActions
                  productId={product.id}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}