export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "converted"
  | "lost";

export type LeadSource =
  | "website"
  | "referral"
  | "social"
  | "advertisement"
  | "walk-in"
  | "other";

export interface Lead {
  id: string;
  leadCode: string;
  name: string;
  company?: string;
  phone: string;
  email?: string;
  source: LeadSource;
  status: LeadStatus;
  estimatedValue: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}