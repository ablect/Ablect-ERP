import { useExecutiveKPIs } from "../hooks/useExecutiveKPIs";
import ExecutiveKPICard from "./ExecutiveKPICard";
const routes:Record<string,string>={revenue:"/sales",profit:"/reports",inventory:"/inventory",customers:"/customers",suppliers:"/suppliers"};
export default function ExecutiveScorecardGrid(){const kpis=useExecutiveKPIs();return <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">{kpis.map((kpi)=><ExecutiveKPICard key={kpi.id} title={kpi.title} value={String(kpi.value)} route={routes[kpi.id]??"/"} category={kpi.format}/>)}</div>;}
