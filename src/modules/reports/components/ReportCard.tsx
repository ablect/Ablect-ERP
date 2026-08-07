import Card from "../../../components/ui/Card";

type Props = {
  title: string;
  value: number;
};

export default function ReportCard({
  title,
  value,
}: Props) {
  return (
    <Card>
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        ₦{value.toLocaleString()}
      </h2>
    </Card>
  );
}