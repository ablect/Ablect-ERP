import Card from "../../../components/ui/Card";
import KPITrendBadge from "./KPITrendBadge";
import { useExecutiveNavigation } from "../hooks/useExecutiveNavigation";
import type { KPIComparison } from "../types/KPIComparison";

type Props = {
  title: string;
  value: string;
  route: string;
  category?: string;
  comparison?: KPIComparison;
};

export default function ExecutiveKPICard({
  title,
  value,
  route,
  comparison,
}: Props) {
  const { open } = useExecutiveNavigation();

  return (
    <Card>
      <button
        className="w-full text-left"
        onClick={() => open(route)}
      >
        <p className="text-sm text-gray-500">
          {title}
        </p>

        <h2 className="text-2xl font-bold mt-1">
          {value}
        </h2>

        {comparison && (
          <div className="mt-3">
            <KPITrendBadge comparison={comparison} />
          </div>
        )}
      </button>
    </Card>
  );
}