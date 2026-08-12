import { create } from "zustand";

export type RevenueOpportunityStage = "lead" | "meeting" | "proposal" | "won" | "lost";
export type RevenueActivityType = "call" | "email" | "meeting" | "task" | "follow-up";
export type RevenueActivityStatus = "pending" | "completed" | "cancelled";
export type EmployeeStatus = "Active" | "Inactive";
export type PayrollStatus = "Draft" | "Processed" | "Paid";

export interface RevenueOpportunity {
  id: string;
  opportunityCode: string;
  name: string;
  customerId?: string;
  customerName: string;
  assignedTo: string;
  stage: RevenueOpportunityStage;
  amount: number;
  probability: number;
  expectedCloseDate?: string;
  source: string;
  nextAction?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RevenueActivity {
  id: string;
  activityCode: string;
  type: RevenueActivityType;
  subject: string;
  description?: string;
  customerId?: string;
  customerName: string;
  opportunityId?: string;
  assignedTo: string;
  dueDate?: string;
  status: RevenueActivityStatus;
  createdAt: string;
  updatedAt: string;
}

export interface RevenueEmployee {
  id: string;
  employeeNumber: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: number;
  commissionRate: number;
  status: EmployeeStatus;
  hiredDate: string;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  period: string;
  basicSalary: number;
  commission: number;
  allowance: number;
  deduction: number;
  tax: number;
  netSalary: number;
  status: PayrollStatus;
  paymentDate?: string;
  createdAt: string;
}

type RevenueOrganizationState = {
  opportunities: RevenueOpportunity[];
  activities: RevenueActivity[];
  employees: RevenueEmployee[];
  payroll: PayrollRecord[];
  addOpportunity: (opportunity: RevenueOpportunity) => void;
  updateOpportunity: (id: string, patch: Partial<RevenueOpportunity>) => void;
  moveOpportunity: (id: string, stage: RevenueOpportunityStage) => void;
  addActivity: (activity: RevenueActivity) => void;
  updateActivity: (id: string, patch: Partial<RevenueActivity>) => void;
  addEmployee: (employee: RevenueEmployee) => void;
  commissionForEmployee: (employeeId: string) => number;
  runPayroll: (period: string) => void;
};

const now = new Date().toISOString();

const seedEmployees: RevenueEmployee[] = [
  { id: "emp-001", employeeNumber: "EMP-001", name: "Adebayo Johnson", email: "adebayo@ablecttechnologies.com", phone: "08030000001", department: "Sales", position: "Sales Executive", salary: 280000, commissionRate: 0.02, status: "Active", hiredDate: "2025-08-12" },
  { id: "emp-002", employeeNumber: "EMP-002", name: "Mariam Ibrahim", email: "mariam@ablecttechnologies.com", phone: "08030000002", department: "Sales", position: "Account Manager", salary: 350000, commissionRate: 0.025, status: "Active", hiredDate: "2025-10-04" },
  { id: "emp-003", employeeNumber: "EMP-003", name: "Daniel Okafor", email: "daniel@ablecttechnologies.com", phone: "08030000003", department: "Operations", position: "Operations Lead", salary: 420000, commissionRate: 0, status: "Active", hiredDate: "2024-06-18" },
  { id: "emp-004", employeeNumber: "EMP-004", name: "Grace Adeyemi", email: "grace@ablecttechnologies.com", phone: "08030000004", department: "Finance", position: "Finance Officer", salary: 390000, commissionRate: 0, status: "Active", hiredDate: "2024-11-20" },
];

const seedOpportunities: RevenueOpportunity[] = [
  { id: "opp-001", opportunityCode: "OPP-1001", name: "Corporate Solar Deployment", customerName: "Prime Estates Ltd", assignedTo: "emp-001", stage: "proposal", amount: 4850000, probability: 72, expectedCloseDate: "2026-08-18", source: "Referral", nextAction: "Proposal review", createdAt: now, updatedAt: now },
  { id: "opp-002", opportunityCode: "OPP-1002", name: "Retail POS Rollout", customerName: "MarketSquare Stores", assignedTo: "emp-002", stage: "meeting", amount: 2250000, probability: 55, expectedCloseDate: "2026-08-24", source: "Website", nextAction: "Product demo", createdAt: now, updatedAt: now },
  { id: "opp-003", opportunityCode: "OPP-1003", name: "CCTV and Access Control", customerName: "Oakview Hotel", assignedTo: "emp-001", stage: "won", amount: 1680000, probability: 100, expectedCloseDate: "2026-08-05", source: "Direct", nextAction: "Schedule installation", createdAt: now, updatedAt: now },
  { id: "opp-004", opportunityCode: "OPP-1004", name: "Factory Inventory Suite", customerName: "Westline Manufacturing", assignedTo: "emp-002", stage: "lead", amount: 3200000, probability: 25, expectedCloseDate: "2026-09-10", source: "Partner", nextAction: "Discovery call", createdAt: now, updatedAt: now },
  { id: "opp-005", opportunityCode: "OPP-1005", name: "Starlink Business Installation", customerName: "BlueHarbor Logistics", assignedTo: "emp-001", stage: "won", amount: 760000, probability: 100, expectedCloseDate: "2026-08-02", source: "WhatsApp", nextAction: "Installation handoff", createdAt: now, updatedAt: now },
  { id: "opp-006", opportunityCode: "OPP-1006", name: "Hybrid Solar Upgrade", customerName: "Greenfield Residence", assignedTo: "emp-002", stage: "lost", amount: 1120000, probability: 0, expectedCloseDate: "2026-07-28", source: "Facebook", nextAction: "Archive", createdAt: now, updatedAt: now },
];

const seedActivities: RevenueActivity[] = [
  { id: "act-001", activityCode: "ACT-2001", type: "meeting", subject: "Solar proposal review", description: "Review commercial solar sizing and payment terms.", customerName: "Prime Estates Ltd", opportunityId: "opp-001", assignedTo: "emp-001", dueDate: "2026-08-12", status: "pending", createdAt: now, updatedAt: now },
  { id: "act-002", activityCode: "ACT-2002", type: "call", subject: "Follow up on POS demo", customerName: "MarketSquare Stores", opportunityId: "opp-002", assignedTo: "emp-002", dueDate: "2026-08-11", status: "pending", createdAt: now, updatedAt: now },
  { id: "act-003", activityCode: "ACT-2003", type: "task", subject: "Prepare hotel installation handoff", customerName: "Oakview Hotel", opportunityId: "opp-003", assignedTo: "emp-001", dueDate: "2026-08-10", status: "completed", createdAt: now, updatedAt: now },
  { id: "act-004", activityCode: "ACT-2004", type: "email", subject: "Send factory ERP brochure", customerName: "Westline Manufacturing", opportunityId: "opp-004", assignedTo: "emp-002", dueDate: "2026-08-14", status: "pending", createdAt: now, updatedAt: now },
];

export const useRevenueOrganizationStore = create<RevenueOrganizationState>((set, get) => ({
  opportunities: seedOpportunities,
  activities: seedActivities,
  employees: seedEmployees,
  payroll: [],
  addOpportunity: (opportunity) => set((state) => ({ opportunities: [opportunity, ...state.opportunities] })),
  updateOpportunity: (id, patch) => set((state) => ({ opportunities: state.opportunities.map((item) => item.id === id ? { ...item, ...patch, updatedAt: new Date().toISOString() } : item) })),
  moveOpportunity: (id, stage) => set((state) => ({ opportunities: state.opportunities.map((item) => item.id === id ? { ...item, stage, probability: stage === "won" ? 100 : stage === "lost" ? 0 : item.probability, updatedAt: new Date().toISOString() } : item) })),
  addActivity: (activity) => set((state) => ({ activities: [activity, ...state.activities] })),
  updateActivity: (id, patch) => set((state) => ({ activities: state.activities.map((item) => item.id === id ? { ...item, ...patch, updatedAt: new Date().toISOString() } : item) })),
  addEmployee: (employee) => set((state) => ({ employees: [employee, ...state.employees] })),
  commissionForEmployee: (employeeId) => {
    const employee = get().employees.find((item) => item.id === employeeId);
    if (!employee) return 0;
    return get().opportunities.filter((item) => item.assignedTo === employeeId && item.stage === "won").reduce((sum, item) => sum + item.amount * employee.commissionRate, 0);
  },
  runPayroll: (period) => {
    const state = get();
    const records = state.employees.filter((employee) => employee.status === "Active").map((employee) => {
      const commission = state.opportunities.filter((item) => item.assignedTo === employee.id && item.stage === "won").reduce((sum, item) => sum + item.amount * employee.commissionRate, 0);
      const allowance = employee.salary * 0.05;
      const deduction = 0;
      const tax = Math.max(0, (employee.salary + commission + allowance) * 0.08);
      return {
        id: `pay-${employee.id}-${period}`,
        employeeId: employee.id,
        period,
        basicSalary: employee.salary,
        commission,
        allowance,
        deduction,
        tax,
        netSalary: employee.salary + commission + allowance - deduction - tax,
        status: "Processed" as PayrollStatus,
        paymentDate: undefined,
        createdAt: new Date().toISOString(),
      } satisfies PayrollRecord;
    });
    set({ payroll: records });
  },
}));
