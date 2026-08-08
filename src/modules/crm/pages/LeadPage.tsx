import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  UserPlus,
  Target,
} from "lucide-react";

import PageContainer from "../../../components/ui/PageContainer";
import SectionTitle from "../../../components/ui/SectionTitle";

import {
  useLeadStore,
} from "../store/LeadStore";

import type { LeadSource } from "../types/lead";

import {
  createLeadCode,
  validateLead,
} from "../services/LeadService";

export default function LeadPage() {
  const leads = useLeadStore(
    (state) => state.leads
  );

  const addLead = useLeadStore(
    (state) => state.addLead
  );

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] =
    useState(false);

  const [name, setName] = useState("");
  const [company, setCompany] =
    useState("");
  const [phone, setPhone] =
    useState("");
  const [email, setEmail] =
    useState("");

  const [source, setSource] =
    useState<LeadSource>("other");

  const [estimatedValue, setEstimatedValue] =
    useState("");

  const filteredLeads = useMemo(() => {
    const query = search
      .toLowerCase()
      .trim();

    if (!query) {
      return leads;
    }

    return leads.filter(
      (lead) =>
        lead.name
          .toLowerCase()
          .includes(query) ||
        lead.leadCode
          .toLowerCase()
          .includes(query) ||
        lead.phone
          .toLowerCase()
          .includes(query) ||
        lead.company
          ?.toLowerCase()
          .includes(query)
    );
  }, [leads, search]);

  const qualified = leads.filter(
    (lead) =>
      lead.status === "qualified"
  ).length;

  const converted = leads.filter(
    (lead) =>
      lead.status === "converted"
  ).length;

  const pipelineValue = leads.reduce(
    (total, lead) =>
      total + lead.estimatedValue,
    0
  );

  function resetForm() {
    setName("");
    setCompany("");
    setPhone("");
    setEmail("");
    setSource("other");
    setEstimatedValue("");
  }

  function handleCreateLead() {
    const lead: Partial<{
      name: string;
      phone: string;
      source: LeadSource;
      estimatedValue: number;
    }> = {
      name,
      phone,
      source,
      estimatedValue:
        Number(estimatedValue) || 0,
    };

    const errors =
      validateLead(lead);

    if (errors.length > 0) {
      window.alert(
        errors.join("\n")
      );
      return;
    }

    const now =
      new Date().toISOString();

    addLead({
      id: crypto.randomUUID(),
      leadCode:
        createLeadCode(leads),
      name: name.trim(),
      company:
        company.trim() || undefined,
      phone: phone.trim(),
      email:
        email.trim() || undefined,
      source,
      status: "new",
      estimatedValue:
        Number(estimatedValue) || 0,
      createdAt: now,
      updatedAt: now,
    });

    resetForm();
    setShowForm(false);
  }

  return (
    <PageContainer>
      <div className="space-y-8">
        <SectionTitle
          title="CRM Leads"
          subtitle="Capture, qualify and manage potential customers."
        />

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-5">
            <div className="flex items-center gap-3">
              <UserPlus size={24} />

              <div>
                <p className="text-sm text-gray-500">
                  Total Leads
                </p>

                <h2 className="text-2xl font-semibold">
                  {leads.length}
                </h2>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <div className="flex items-center gap-3">
              <Target size={24} />

              <div>
                <p className="text-sm text-gray-500">
                  Qualified
                </p>

                <h2 className="text-2xl font-semibold">
                  {qualified}
                </h2>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <div>
              <p className="text-sm text-gray-500">
                Pipeline Value
              </p>

              <h2 className="text-2xl font-semibold">
                {pipelineValue.toLocaleString()}
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                {converted} converted
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search leads..."
              className="w-full rounded-lg border py-2 pl-10 pr-4 outline-none"
            />
          </div>

          <button
            type="button"
            onClick={() =>
              setShowForm(
                (value) => !value
              )
            }
            className="flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2 text-white"
          >
            <Plus size={18} />
            Add Lead
          </button>
        </div>

        {showForm && (
          <div className="rounded-xl border bg-white p-6">
            <h2 className="mb-5 text-xl font-semibold">
              Create Lead
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                value={name}
                onChange={(event) =>
                  setName(
                    event.target.value
                  )
                }
                placeholder="Lead name *"
                className="rounded-lg border px-3 py-2"
              />

              <input
                value={company}
                onChange={(event) =>
                  setCompany(
                    event.target.value
                  )
                }
                placeholder="Company"
                className="rounded-lg border px-3 py-2"
              />

              <input
                value={phone}
                onChange={(event) =>
                  setPhone(
                    event.target.value
                  )
                }
                placeholder="Phone *"
                className="rounded-lg border px-3 py-2"
              />

              <input
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
                placeholder="Email"
                className="rounded-lg border px-3 py-2"
              />

              <select
                value={source}
                onChange={(event) =>
                  setSource(
                    event.target
                      .value as LeadSource
                  )
                }
                className="rounded-lg border px-3 py-2"
              >
                <option value="website">
                  Website
                </option>

                <option value="referral">
                  Referral
                </option>

                <option value="social">
                  Social Media
                </option>

                <option value="advertisement">
                  Advertisement
                </option>

                <option value="walk-in">
                  Walk-in
                </option>

                <option value="other">
                  Other
                </option>
              </select>

              <input
                type="number"
                min="0"
                value={estimatedValue}
                onChange={(event) =>
                  setEstimatedValue(
                    event.target.value
                  )
                }
                placeholder="Estimated value"
                className="rounded-lg border px-3 py-2"
              />
            </div>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={
                  handleCreateLead
                }
                className="rounded-lg bg-black px-5 py-2 text-white"
              >
                Save Lead
              </button>

              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
                className="rounded-lg border px-5 py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="overflow-hidden rounded-xl border bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">
                    Code
                  </th>

                  <th className="px-4 py-3 text-left">
                    Lead
                  </th>

                  <th className="px-4 py-3 text-left">
                    Company
                  </th>

                  <th className="px-4 py-3 text-left">
                    Source
                  </th>

                  <th className="px-4 py-3 text-left">
                    Status
                  </th>

                  <th className="px-4 py-3 text-right">
                    Estimated Value
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-gray-500"
                    >
                      No leads found.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map(
                    (lead) => (
                      <tr
                        key={lead.id}
                        className="border-b last:border-b-0"
                      >
                        <td className="px-4 py-3 font-medium">
                          {lead.leadCode}
                        </td>

                        <td className="px-4 py-3">
                          {lead.name}
                        </td>

                        <td className="px-4 py-3">
                          {lead.company ||
                            "-"}
                        </td>

                        <td className="px-4 py-3 capitalize">
                          {lead.source}
                        </td>

                        <td className="px-4 py-3 capitalize">
                          {lead.status}
                        </td>

                        <td className="px-4 py-3 text-right">
                          {lead.estimatedValue.toLocaleString()}
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}