import Card from "../../../components/ui/Card";

type Props = {

  title: string;

  value: string | number;

};

export default function SalesSummaryCard({

  title,

  value,

}: Props) {

  return (

    <Card>

      <p className="text-sm text-slate-500">

        {title}

      </p>

      <h2 className="mt-2 text-2xl font-bold">

        {value}

      </h2>

    </Card>

  );

}