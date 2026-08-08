import type { Opportunity } from "../types/opportunity";

export function createOpportunityCode(
  opportunities: Opportunity[]
): string {
  return `OPP-${String(
    opportunities.length + 1
  ).padStart(5, "0")}`;
}

export function validateOpportunity(
  opportunity: Partial<Opportunity>
): string[] {
  const errors: string[] = [];

  if (!opportunity.name?.trim()) {
    errors.push(
      "Opportunity name is required."
    );
  }

  if (
    opportunity.amount !== undefined &&
    opportunity.amount < 0
  ) {
    errors.push(
      "Opportunity amount cannot be negative."
    );
  }

  if (
    opportunity.probability !== undefined &&
    (opportunity.probability < 0 ||
      opportunity.probability > 100)
  ) {
    errors.push(
      "Probability must be between 0 and 100."
    );
  }

  return errors;
}