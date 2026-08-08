import type { Lead } from "../types/lead";

export function createLeadCode(
  leads: Lead[]
): string {
  const nextNumber = leads.length + 1;

  return `LEAD-${String(nextNumber).padStart(5, "0")}`;
}

export function validateLead(
  lead: Partial<Lead>
): string[] {
  const errors: string[] = [];

  if (!lead.name?.trim()) {
    errors.push("Lead name is required.");
  }

  if (!lead.phone?.trim()) {
    errors.push("Phone number is required.");
  }

  if (!lead.source) {
    errors.push("Lead source is required.");
  }

  if (
    lead.estimatedValue !== undefined &&
    lead.estimatedValue < 0
  ) {
    errors.push(
      "Estimated value cannot be negative."
    );
  }

  return errors;
}