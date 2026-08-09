import { useExecutiveKPIs } from "../hooks/useExecutiveKPIs";
import ExecutiveKPICard from "./ExecutiveKPICard";

export default function ExecutiveScorecardGrid(){
  const kpis=useExecutiveKPIs();
  return <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
    {kpis.map((kpi)=><ExecutiveKPICard key={kpi.id} title={kpi.title} value={String(kpi.value)} />)}
  </div>;
}
