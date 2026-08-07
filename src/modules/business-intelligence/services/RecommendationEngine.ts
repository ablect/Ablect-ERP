import type {
  Insight,
} from "../types/Insight";

import type {
  Recommendation,
} from "../types/Recommendation";

export function buildRecommendations(
  insights: Insight[],
): Recommendation[] {

  return insights.map((insight) => ({

    id: `${insight.id}-recommendation`,

    title: `Review ${insight.title}`,

    description: `Investigate and resolve the issue related to ${insight.metricId}.`,

    priority:
      insight.severity === "critical"
        ? "critical"
        : insight.severity === "warning"
        ? "high"
        : "medium",

    action: "Open detailed analytics",

    relatedInsightId: insight.id,

    createdAt: new Date(),

    status: "new",

  }));

}