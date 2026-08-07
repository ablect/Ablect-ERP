import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Table({
  children,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

      <table className="min-w-full">
        {children}
      </table>

    </div>
  );
}