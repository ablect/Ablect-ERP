import { z } from "zod";

export const purchaseItemSchema = z.object({

  productId: z.string(),

  quantity: z.number(),

  unitCost: z.number(),

  total: z.number(),

});

export const purchaseSchema = z.object({

  supplierId: z.string().min(1),

  invoiceNumber: z.string().min(1),

  purchaseDate: z.date(),

  totalAmount: z.number(),

  items: z.array(

    purchaseItemSchema

  ),

});

export type PurchaseSchema =

z.infer<typeof purchaseSchema>;