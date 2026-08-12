import { useExecutiveKPIs } from "../hooks/useExecutiveKPIs";
import KPICard from "./KPICard";

export default function KPIGrid() {
  const kpis = useExecutiveKPIs();
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {kpis.map((item) => <KPICard key={item.id} kpi={item} />)}
    </div>
  );
}
