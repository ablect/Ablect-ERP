import SelectField from "../../../components/ui/SelectField";
import { useBrands } from "../hooks/useBrands";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function BrandSelect({
  value,
  onChange,
}: Props) {

  const { brands } = useBrands();

  return (

    <SelectField
      value={value}
      onChange={(e)=>onChange(e.target.value)}
    >

      <option value="">
        Select Brand
      </option>

      {brands.map((brand)=>(

        <option
          key={brand.id}
          value={brand.id}
        >
          {brand.name}
        </option>

      ))}

    </SelectField>

  );

}