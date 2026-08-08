export type OpportunityStage =
  | "qualification"
  | "proposal"
  | "negotiation"
  | "won"
  | "lost";

export interface Opportunity {
  id: string;
  opportunityCode: string;
  name: string;
  customerId?: string;
  leadId?: string;
  stage: OpportunityStage;
  amount: number;
  probability: number;
  expectedCloseDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}