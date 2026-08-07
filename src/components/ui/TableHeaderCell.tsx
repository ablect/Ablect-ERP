import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function TableHeaderCell({
  children,
}: Props) {
  return (
    <th className="p-4 text-left font-semibold text-slate-700">
      {children}
    </th>
  );
}