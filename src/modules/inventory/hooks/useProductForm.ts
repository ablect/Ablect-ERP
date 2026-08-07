import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  productSchema,
  type ProductSchema,
} from "../validation/productSchema";

import { productDefaults } from "../utils/productDefaults";

export function useProductForm() {

  return useForm<ProductSchema>({

    resolver: zodResolver(productSchema),

    defaultValues: productDefaults(),

    mode: "onChange",

  });

}