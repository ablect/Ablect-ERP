import type { CRMActivity } from "../types/activity";

export function createActivityCode(
  activities: CRMActivity[]
): string {
  return `ACT-${String(
    activities.length + 1
  ).padStart(5, "0")}`;
}

export function validateActivity(
  activity: Partial<CRMActivity>
): string[] {
  const errors: string[] = [];

  if (!activity.subject?.trim()) {
    errors.push(
      "Activity subject is required."
    );
  }

  if (!activity.type) {
    errors.push(
      "Activity type is required."
    );
  }

  return errors;
}