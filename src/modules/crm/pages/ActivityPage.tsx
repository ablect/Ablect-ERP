import { useMemo, useState } from "react";
import {
  CalendarCheck,
  CheckCircle,
  Clock,
  Plus,
} from "lucide-react";

import PageContainer from "../../../components/ui/PageContainer";
import SectionTitle from "../../../components/ui/SectionTitle";

import {
  useActivityStore,
} from "../store/ActivityStore";

import type {
  ActivityType,
} from "../types/activity";

import {
  createActivityCode,
  validateActivity,
} from "../services/ActivityService";

export default function ActivityPage() {
  const activities =
    useActivityStore(
      (state) => state.activities
    );

  const addActivity =
    useActivityStore(
      (state) => state.addActivity
    );

  const [showForm, setShowForm] =
    useState(false);

  const [subject, setSubject] =
    useState("");

  const [type, setType] =
    useState<ActivityType>("task");

  const [description, setDescription] =
    useState("");

  const [dueDate, setDueDate] =
    useState("");

  const pending =
    activities.filter(
      (item) =>
        item.status === "pending"
    ).length;

  const completed =
    activities.filter(
      (item) =>
        item.status === "completed"
    ).length;

  const upcoming =
    useMemo(
      () =>
        activities.filter(
          (item) =>
            item.status === "pending"
        ),
      [activities]
    );

  function createActivity() {
    const data = {
      subject,
      type,
    };

    const errors =
      validateActivity(data);

    if (errors.length) {
      window.alert(
        errors.join("\n")
      );
      return;
    }

    const now =
      new Date().toISOString();

    addActivity({
      id: crypto.randomUUID(),
      activityCode:
        createActivityCode(
          activities
        ),
      subject: subject.trim(),
      type,
      description:
        description.trim() ||
        undefined,
      dueDate:
        dueDate || undefined,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    });

    setSubject("");
    setDescription("");
    setDueDate("");
    setType("task");
    setShowForm(false);
  }

  return (
    <PageContainer>
      <div className="space-y-8">
        <SectionTitle
          title="CRM Activities"
          subtitle="Manage calls, meetings, follow-ups and tasks."
        />

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-5">
            <Clock />

            <p className="mt-3 text-sm text-gray-500">
              Pending
            </p>

            <h2 className="text-2xl font-semibold">
              {pending}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <CheckCircle />

            <p className="mt-3 text-sm text-gray-500">
              Completed
            </p>

            <h2 className="text-2xl font-semibold">
              {completed}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <CalendarCheck />

            <p className="mt-3 text-sm text-gray-500">
              Upcoming
            </p>

            <h2 className="text-2xl font-semibold">
              {upcoming.length}
            </h2>
          </div>
        </div>

        <button
          onClick={() =>
            setShowForm((v) => !v)
          }
          className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white"
        >
          <Plus size={18} />
          Add Activity
        </button>

        {showForm && (
          <div className="rounded-xl border bg-white p-6">
            <h2 className="mb-5 text-xl font-semibold">
              New Activity
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                value={subject}
                onChange={(e) =>
                  setSubject(
                    e.target.value
                  )
                }
                placeholder="Activity subject"
                className="rounded-lg border px-3 py-2"
              />

              <select
                value={type}
                onChange={(e) =>
                  setType(
                    e.target
                      .value as ActivityType
                  )
                }
                className="rounded-lg border px-3 py-2"
              >
                <option value="call">
                  Call
                </option>

                <option value="meeting">
                  Meeting
                </option>

                <option value="email">
                  Email
                </option>

                <option value="follow-up">
                  Follow-up
                </option>

                <option value="task">
                  Task
                </option>
              </select>

              <input
                type="date"
                value={dueDate}
                onChange={(e) =>
                  setDueDate(
                    e.target.value
                  )
                }
                className="rounded-lg border px-3 py-2"
              />

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                placeholder="Description"
                className="rounded-lg border px-3 py-2"
              />
            </div>

            <button
              onClick={createActivity}
              className="mt-5 rounded-lg bg-black px-5 py-2 text-white"
            >
              Save Activity
            </button>
          </div>
        )}

        <div className="overflow-hidden rounded-xl border bg-white">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  Code
                </th>

                <th className="px-4 py-3 text-left">
                  Subject
                </th>

                <th className="px-4 py-3 text-left">
                  Type
                </th>

                <th className="px-4 py-3 text-left">
                  Due
                </th>

                <th className="px-4 py-3 text-left">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {activities.map(
                (item) => (
                  <tr
                    key={item.id}
                    className="border-b"
                  >
                    <td className="px-4 py-3">
                      {item.activityCode}
                    </td>

                    <td className="px-4 py-3">
                      {item.subject}
                    </td>

                    <td className="px-4 py-3 capitalize">
                      {item.type}
                    </td>

                    <td className="px-4 py-3">
                      {item.dueDate || "-"}
                    </td>

                    <td className="px-4 py-3 capitalize">
                      {item.status}
                    </td>
                  </tr>
                )
              )}

              {!activities.length && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-gray-500"
                  >
                    No activities found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PageContainer>
  );
}