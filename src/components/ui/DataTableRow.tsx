import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function DataTableRow({ children }: Props) {
  return (
    <tr className="border-b transition hover:bg-slate-50">
      {children}
    </tr>
  );
}