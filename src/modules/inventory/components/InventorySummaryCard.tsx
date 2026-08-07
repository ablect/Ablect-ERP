import Card from "../../../components/ui/Card";

type Props = {

  title: string;

  value: number;

};

export default function InventorySummaryCard({

  title,

  value,

}: Props) {

  return (

    <Card>

      <p className="text-sm text-slate-500">

        {title}

      </p>

      <h2 className="mt-3 text-3xl font-bold">

        {value}

      </h2>

    </Card>

  );

}