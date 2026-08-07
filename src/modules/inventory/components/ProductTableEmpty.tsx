type Props = {
  title: string;
  description: string;
};

export default function EmptyState({
  title,
  description,
}: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center">
      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      <p className="mt-3 text-slate-500">
        {description}
      </p>
    </div>
  );
}