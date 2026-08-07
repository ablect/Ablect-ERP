import type { UseFormRegister } from "react-hook-form";
import type { ProductSchema } from "../validation/productSchema";

import FormField from "../../../components/ui/FormField";
import TextArea from "../../../components/ui/TextArea";

type Props = {
  register: UseFormRegister<ProductSchema>;
};

export default function ProductDescription({
  register,
}: Props) {
  return (
    <FormField label="Description">

      <TextArea
        {...register("description")}
      />

    </FormField>
  );
}