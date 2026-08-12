type Props = { onEdit: () => void; onDelete: () => void; onPost: () => void };

export default function JournalActions({ onEdit, onDelete, onPost }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={onEdit} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold">Edit</button>
      <button type="button" onClick={onPost} className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white">Post</button>
      <button type="button" onClick={onDelete} className="rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700">Delete</button>
    </div>
  );
}
