import StatCard from "../../../components/ui/StatCard";

type Props = {

  title: string;

  value: string | number;

};

export default function QuickStat({

  title,

  value,

}: Props) {

  return (

    <StatCard

      title={title}

      value={value}

    />

  );

}