import Card from "../../../components/ui/Card";
import Sparkline from "./Sparkline";
import KPIComparisonBadge from "./KPIComparisonBadge";
import type { KPIComparison } from "../types/KPIComparison";

type Props = {

  title: string;

  value: string;

  comparison?: KPIComparison;

  trend: number[];

};

export default function KPIStatCard({

  title,

  value,

  comparison,

  trend,

}: Props) {

  return (

    <Card className="p-5 rounded-2xl">

      <div className="flex justify-between items-start">

        <div>

          <p className="text-sm text-gray-500">

            {title}

          </p>

          <h2 className="mt-2 text-3xl font-bold">

            {value}

          </h2>

        </div>

        {

          comparison && (

            <KPIComparisonBadge

              comparison={comparison}

            />

          )

        }

      </div>

      <div className="mt-6">

        <Sparkline

          values={trend}

        />

      </div>

    </Card>

  );

}