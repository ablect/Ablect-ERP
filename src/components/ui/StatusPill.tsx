type Props = {
  text: string;
};

export default function StatusPill({
  text,
}: Props) {
  return (
    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
      {text}
    </span>
  );
}