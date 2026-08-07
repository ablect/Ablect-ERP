import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function DataTableHeaderCell({
  children,
}: Props) {
  return (
    <th className="p-4 text-left text-sm font-semibold text-slate-700">
      {children}
    </th>
  );
}