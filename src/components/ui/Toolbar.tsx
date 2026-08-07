import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Toolbar({
  children,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {children}
    </div>
  );
}