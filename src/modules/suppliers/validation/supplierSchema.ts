import { z } from "zod";

export const supplierSchema = z.object({

  name: z.string().min(2),

  email: z.string().email(),

  phone: z.string().min(7),

  address: z.string().min(3),

});

export type SupplierSchema =

z.infer<typeof supplierSchema>;