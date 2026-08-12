import { dashboardCards } from "../services/dashboardService";
import DashboardCard from "./DashboardCard";

export default function DashboardContent() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {dashboardCards.map((card) => <DashboardCard key={card.title} card={card} />)}
    </div>
  );
}
