import "./ProductTable.css";
import type { Product } from "../../models/Product";

type Props = {
  products: Product[];
};

export default function ProductTable({ products }: Props) {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Barcode</th>
          <th>SKU</th>
          <th>Name</th>
          <th>Category</th>
          <th>Brand</th>
          <th>Unit</th>
          <th>Qty</th>
          <th>Cost</th>
          <th>Selling</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.barcode}</td>
            <td>{product.sku}</td>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{product.brand}</td>
            <td>{product.unit}</td>
            <td>{product.quantity}</td>
            <td>{product.costPrice}</td>
            <td>{product.sellingPrice}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}