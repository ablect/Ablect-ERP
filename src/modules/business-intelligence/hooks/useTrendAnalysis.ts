import { analyzeTrend } from "../services/TrendAnalyzer";

export function useTrendAnalysis(values: number[]) {

  return {

    trend: analyzeTrend(values),

  };

}