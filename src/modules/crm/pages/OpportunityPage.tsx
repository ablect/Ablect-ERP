import { useMemo, useState } from "react";
import {
  DollarSign,
  Plus,
  Search,
  Target,
  Trophy,
} from "lucide-react";

import PageContainer from "../../../components/ui/PageContainer";
import SectionTitle from "../../../components/ui/SectionTitle";

import {
  useOpportunityStore,
} from "../store/OpportunityStore";

import type {
  OpportunityStage,
} from "../types/opportunity";

import {
  createOpportunityCode,
  validateOpportunity,
} from "../services/OpportunityService";

export default function OpportunityPage() {
  const opportunities =
    useOpportunityStore(
      (state) => state.opportunities
    );

  const addOpportunity =
    useOpportunityStore(
      (state) => state.addOpportunity
    );

  const [search, setSearch] =
    useState("");

  const [showForm, setShowForm] =
    useState(false);

  const [name, setName] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [probability, setProbability] =
    useState("50");

  const [stage, setStage] =
    useState<OpportunityStage>(
      "qualification"
    );

  const filtered =
    useMemo(() => {
      const query =
        search.toLowerCase().trim();

      if (!query) {
        return opportunities;
      }

      return opportunities.filter(
        (item) =>
          item.name
            .toLowerCase()
            .includes(query) ||
          item.opportunityCode
            .toLowerCase()
            .includes(query)
      );
    }, [opportunities, search]);

  const pipeline =
    opportunities.reduce(
      (sum, item) =>
        sum + item.amount,
      0
    );

  const weightedPipeline =
    opportunities.reduce(
      (sum, item) =>
        sum +
        item.amount *
          (item.probability / 100),
      0
    );

  const won =
    opportunities.filter(
      (item) => item.stage === "won"
    ).length;

  function createOpportunity() {
    const data = {
      name,
      amount: Number(amount) || 0,
      probability:
        Number(probability) || 0,
      stage,
    };

    const errors =
      validateOpportunity(data);

    if (errors.length) {
      window.alert(
        errors.join("\n")
      );
      return;
    }

    const now =
      new Date().toISOString();

    addOpportunity({
      id: crypto.randomUUID(),
      opportunityCode:
        createOpportunityCode(
          opportunities
        ),
      name: name.trim(),
      stage,
      amount:
        Number(amount) || 0,
      probability:
        Number(probability) || 0,
      createdAt: now,
      updatedAt: now,
    });

    setName("");
    setAmount("");
    setProbability("50");
    setStage("qualification");
    setShowForm(false);
  }

  return (
    <PageContainer>
      <div className="space-y-8">
        <SectionTitle
          title="Opportunities"
          subtitle="Manage sales opportunities and pipeline."
        />

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-5">
            <div className="flex items-center gap-3">
              <DollarSign />

              <div>
                <p className="text-sm text-gray-500">
                  Pipeline
                </p>

                <h2 className="text-2xl font-semibold">
                  {pipeline.toLocaleString()}
                </h2>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <div className="flex items-center gap-3">
              <Target />

              <div>
                <p className="text-sm text-gray-500">
                  Weighted Pipeline
                </p>

                <h2 className="text-2xl font-semibold">
                  {weightedPipeline.toLocaleString()}
                </h2>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <div className="flex items-center gap-3">
              <Trophy />

              <div>
                <p className="text-sm text-gray-500">
                  Won
                </p>

                <h2 className="text-2xl font-semibold">
                  {won}
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div className="relative w-full max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search opportunities..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />
          </div>

          <button
            onClick={() =>
              setShowForm((v) => !v)
            }
            className="flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2 text-white"
          >
            <Plus size={18} />
            Add Opportunity
          </button>
        </div>

        {showForm && (
          <div className="rounded-xl border bg-white p-6">
            <h2 className="mb-5 text-xl font-semibold">
              New Opportunity
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Opportunity name"
                className="rounded-lg border px-3 py-2"
              />

              <input
                type="number"
                min="0"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
                placeholder="Amount"
                className="rounded-lg border px-3 py-2"
              />

              <input
                type="number"
                min="0"
                max="100"
                value={probability}
                onChange={(e) =>
                  setProbability(
                    e.target.value
                  )
                }
                placeholder="Probability %"
                className="rounded-lg border px-3 py-2"
              />

              <select
                value={stage}
                onChange={(e) =>
                  setStage(
                    e.target
                      .value as OpportunityStage
                  )
                }
                className="rounded-lg border px-3 py-2"
              >
                <option value="qualification">
                  Qualification
                </option>

                <option value="proposal">
                  Proposal
                </option>

                <option value="negotiation">
                  Negotiation
                </option>

                <option value="won">
                  Won
                </option>

                <option value="lost">
                  Lost
                </option>
              </select>
            </div>

            <button
              onClick={createOpportunity}
              className="mt-5 rounded-lg bg-black px-5 py-2 text-white"
            >
              Save Opportunity
            </button>
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
                    Opportunity
                  </th>
                  <th className="px-4 py-3 text-left">
                    Stage
                  </th>
                  <th className="px-4 py-3 text-left">
                    Probability
                  </th>
                  <th className="px-4 py-3 text-right">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                {filtered.map(
                  (item) => (
                    <tr
                      key={item.id}
                      className="border-b"
                    >
                      <td className="px-4 py-3">
                        {item.opportunityCode}
                      </td>

                      <td className="px-4 py-3">
                        {item.name}
                      </td>

                      <td className="px-4 py-3 capitalize">
                        {item.stage}
                      </td>

                      <td className="px-4 py-3">
                        {item.probability}%
                      </td>

                      <td className="px-4 py-3 text-right">
                        {item.amount.toLocaleString()}
                      </td>
                    </tr>
                  )
                )}

                {!filtered.length && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-gray-500"
                    >
                      No opportunities found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}