import { z } from "zod";

export const productSchema = z.object({

  name: z.string().min(2),

  sku: z.string().min(2),

  barcode: z.string(),

  categoryId: z.string(),

  brandId: z.string(),

  unitId: z.string(),

  costPrice: z.number(),

  sellingPrice: z.number(),

  quantity: z.number(),

  minimumStock: z.number(),

  description: z.string(),

});

export type ProductSchema =
  z.infer<typeof productSchema>;