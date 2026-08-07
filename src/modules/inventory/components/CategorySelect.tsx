import SelectField from "../../../components/ui/SelectField";

import { useCategories } from "../hooks/useCategories";

type Props = {

  value: string;

  onChange: (value: string) => void;

};

export default function CategorySelect({

  value,

  onChange,

}: Props) {

  const {

    categories,

  } = useCategories();

  return (

    <SelectField

      value={value}

      onChange={(e)=>onChange(e.target.value)}

    >

      <option value="">

        Select Category

      </option>

      {categories.map(category=>(

        <option

          key={category.id}

          value={category.id}

        >

          {category.name}

        </option>

      ))}

    </SelectField>

  );

}