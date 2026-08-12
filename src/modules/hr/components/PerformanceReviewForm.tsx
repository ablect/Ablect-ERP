import { useState } from "react";
import { usePerformanceReviewStore } from "../store/PerformanceReviewStore";
import type { PerformanceReview } from "../types/PerformanceReview";

export default function PerformanceReviewForm() {
  const setReviews = usePerformanceReviewStore((state) => state.setReviews);
  const reviews = usePerformanceReviewStore((state) => state.reviews);
  const [employeeId, setEmployeeId] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [score, setScore] = useState(0);
  const [comments, setComments] = useState("");

  function save() {
    if (!employeeId.trim() || !reviewer.trim()) return;
    const review: PerformanceReview = {
      id: crypto.randomUUID(),
      employeeId: employeeId.trim(),
      reviewPeriod: new Date().toISOString().slice(0, 7),
      reviewer: reviewer.trim(),
      score,
      comments: comments.trim(),
      status: "Draft",
    };
    setReviews([...reviews, review]);
    setEmployeeId("");
    setReviewer("");
    setScore(0);
    setComments("");
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <input value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} placeholder="Employee ID" className="rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-indigo-300" />
        <input value={reviewer} onChange={(e) => setReviewer(e.target.value)} placeholder="Reviewer" className="rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-indigo-300" />
        <input type="number" min={0} max={100} value={score} onChange={(e) => setScore(Number(e.target.value))} placeholder="Score" className="rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-indigo-300" />
        <input value={comments} onChange={(e) => setComments(e.target.value)} placeholder="Comments" className="rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-indigo-300" />
      </div>
      <button type="button" onClick={save} className="mt-4 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-indigo-700">Save review</button>
    </section>
  );
}
