import type { Brand } from "../types/Brand";
import Card from "../../../components/ui/Card";

type Props = {

  brand: Brand;

};

export default function BrandCard({

  brand,

}: Props) {

  return (

    <Card>

      <h3 className="font-semibold">

        {brand.name}

      </h3>

      <p className="text-slate-500 mt-2">

        {brand.country}

      </p>

      <p className="text-blue-600 text-sm">

        {brand.website}

      </p>

    </Card>

  );

}