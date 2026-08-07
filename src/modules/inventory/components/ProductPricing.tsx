import type { UseFormRegister } from "react-hook-form";
import type { ProductSchema } from "../validation/productSchema";

import FormGrid from "../../../components/ui/FormGrid";
import FormField from "../../../components/ui/FormField";
import Input from "../../../components/ui/Input";

type Props = {
  register: UseFormRegister<ProductSchema>;
};

export default function ProductPricing({
  register,
}: Props) {
  return (
    <FormGrid>

      <FormField label="Cost Price">
        <Input
          type="number"
          {...register("costPrice", {
            valueAsNumber: true,
          })}
        />
      </FormField>

      <FormField label="Selling Price">
        <Input
          type="number"
          {...register("sellingPrice", {
            valueAsNumber: true,
          })}
        />
      </FormField>

      <FormField label="Opening Stock">
        <Input
          type="number"
          {...register("quantity", {
            valueAsNumber: true,
          })}
        />
      </FormField>

      <FormField label="Minimum Stock">
        <Input
          type="number"
          {...register("minimumStock", {
            valueAsNumber: true,
          })}
        />
      </FormField>

    </FormGrid>
  );
}