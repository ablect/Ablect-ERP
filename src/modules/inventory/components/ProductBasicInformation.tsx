import type { Control, UseFormRegister } from "react-hook-form";
import { Controller } from "react-hook-form";

import type { ProductSchema } from "../validation/productSchema";

import FormGrid from "../../../components/ui/FormGrid";
import FormField from "../../../components/ui/FormField";
import Input from "../../../components/ui/Input";

import CategorySelect from "./CategorySelect";
import BrandSelect from "./BrandSelect";

type Props = {

  register: UseFormRegister<ProductSchema>;

  control: Control<ProductSchema>;

};

export default function ProductBasicInformation({

  register,

  control,

}: Props) {

  return (

    <FormGrid>

      <FormField label="Product Name">

        <Input
          {...register("name")}
        />

      </FormField>

      <FormField label="SKU">

        <Input
          {...register("sku")}
        />

      </FormField>

      <FormField label="Barcode">

        <Input
          {...register("barcode")}
        />

      </FormField>

      <FormField label="Category">

        <Controller

          control={control}

          name="categoryId"

          render={({ field }) => (

            <CategorySelect

              value={field.value}

              onChange={field.onChange}

            />

          )}

        />

      </FormField>

      <FormField label="Brand">

        <Controller

          control={control}

          name="brandId"

          render={({ field }) => (

            <BrandSelect

              value={field.value}

              onChange={field.onChange}

            />

          )}

        />

      </FormField>

      <FormField label="Unit">

        <Input
          {...register("unitId")}
        />

      </FormField>

    </FormGrid>

  );

}