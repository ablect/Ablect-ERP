import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function DataTableHead({ children }: Props) {
  return (
    <thead className="bg-slate-100">
      {children}
    </thead>
  );
}