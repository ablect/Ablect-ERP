import {
  Users,
  UserPlus,
  Target,
  CalendarCheck,
} from "lucide-react";

import PageContainer from "../../../components/ui/PageContainer";
import SectionTitle from "../../../components/ui/SectionTitle";

import {
  useCustomerStore,
} from "../store/CustomerStore";

import {
  useLeadStore,
} from "../store/LeadStore";

import {
  useOpportunityStore,
} from "../store/OpportunityStore";

import {
  useActivityStore,
} from "../store/ActivityStore";

export default function CRMDashboardPage() {
  const customers =
    useCustomerStore(
      (state) => state.customers
    );

  const leads =
    useLeadStore(
      (state) => state.leads
    );

  const opportunities =
    useOpportunityStore(
      (state) => state.opportunities
    );

  const activities =
    useActivityStore(
      (state) => state.activities
    );

  const pipeline =
    opportunities.reduce(
      (sum, item) =>
        sum + item.amount,
      0
    );

  const pendingActivities =
    activities.filter(
      (item) =>
        item.status === "pending"
    ).length;

  return (
    <PageContainer>
      <div className="space-y-8">
        <SectionTitle
          title="CRM Dashboard"
          subtitle="Customer relationships, leads, opportunities and activities."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-white p-5">
            <Users size={24} />

            <p className="mt-3 text-sm text-gray-500">
              Customers
            </p>

            <h2 className="text-3xl font-semibold">
              {customers.length}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <UserPlus size={24} />

            <p className="mt-3 text-sm text-gray-500">
              Leads
            </p>

            <h2 className="text-3xl font-semibold">
              {leads.length}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <Target size={24} />

            <p className="mt-3 text-sm text-gray-500">
              Opportunities
            </p>

            <h2 className="text-3xl font-semibold">
              {opportunities.length}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Pipeline:{" "}
              {pipeline.toLocaleString()}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <CalendarCheck size={24} />

            <p className="mt-3 text-sm text-gray-500">
              Pending Activities
            </p>

            <h2 className="text-3xl font-semibold">
              {pendingActivities}
            </h2>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <h2 className="text-xl font-semibold">
            CRM Engine Status
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              Customer management
              <span className="ml-2 text-sm">
                ✓ Active
              </span>
            </div>

            <div className="rounded-lg border p-4">
              Lead management
              <span className="ml-2 text-sm">
                ✓ Active
              </span>
            </div>

            <div className="rounded-lg border p-4">
              Opportunity pipeline
              <span className="ml-2 text-sm">
                ✓ Active
              </span>
            </div>

            <div className="rounded-lg border p-4">
              Activity management
              <span className="ml-2 text-sm">
                ✓ Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}