type Props = {
  sku: string;
};

export default function ProductSku({
  sku,
}: Props) {
  return (
    <code className="rounded bg-slate-100 px-2 py-1 text-xs">
      {sku}
    </code>
  );
}