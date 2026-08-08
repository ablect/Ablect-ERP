export type ActivityType =
  | "call"
  | "meeting"
  | "email"
  | "follow-up"
  | "task";

export type ActivityStatus =
  | "pending"
  | "completed"
  | "cancelled";

export interface CRMActivity {
  id: string;
  activityCode: string;
  type: ActivityType;
  subject: string;
  description?: string;
  customerId?: string;
  leadId?: string;
  opportunityId?: string;
  assignedTo?: string;
  dueDate?: string;
  status: ActivityStatus;
  createdAt: string;
  updatedAt: string;
}