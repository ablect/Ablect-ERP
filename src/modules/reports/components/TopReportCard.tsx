import Card
from "../../../components/ui/Card";

type Props = {

  title: string;

  value: number;

};

export default function TopReportCard({

  title,

  value,

}: Props) {

  return (

    <Card>

      <h2 className="text-sm text-slate-500">

        {title}

      </h2>

      <p className="mt-2 text-3xl font-bold">

        ₦{value.toLocaleString()}

      </p>

    </Card>

  );

}