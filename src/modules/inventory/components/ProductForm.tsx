import type { ProductSchema } from "../validation/productSchema";

import Form from "../../../components/ui/Form";
import Card from "../../../components/ui/Card";

import ProductBasicInformation from "./ProductBasicInformation";
import ProductPricing from "./ProductPricing";
import ProductDescription from "./ProductDescription";

import { useProductForm } from "../hooks/useProductForm";
import { createProduct } from "../utils/createProduct";
import { productService } from "../services/ProductService";
import { useProductStore } from "../store/ProductStore";

export default function ProductForm() {

  const form = useProductForm();

  async function submit(data: ProductSchema) {

    const product = createProduct(data);

    const products = await productService.create(product);

    useProductStore
      .getState()
      .setProducts(products);

    form.reset();

  }

  return (

    <Form
      onSubmit={form.handleSubmit(submit)}
    >

      <Card>

        <div className="space-y-8">

          <ProductBasicInformation
            register={form.register}
            control={form.control}
          />

          <ProductPricing
            register={form.register}
          />

          <ProductDescription
            register={form.register}
          />

        </div>

      </Card>

    </Form>

  );

}