import ExecutiveDashboardHeader from "./ExecutiveDashboardHeader";
import ExecutiveFilterBar from "./ExecutiveFilterBar";
import ExecutiveSummary from "./ExecutiveSummary";
import ExecutiveWidgets from "./ExecutiveWidgets";
import OpenRecommendationsCounter from "./OpenRecommendationsCounter";

type Props={

  healthScore:number;

};

export default function ExecutiveDashboardLayout({

  healthScore,

}:Props){

  return(

    <div className="space-y-8">

      <ExecutiveDashboardHeader/>

      <div className="flex flex-wrap justify-between gap-6">

        <ExecutiveSummary

          score={healthScore}

        />

        <OpenRecommendationsCounter/>

      </div>

      <ExecutiveFilterBar/>

      <ExecutiveWidgets/>

    </div>

  );

}