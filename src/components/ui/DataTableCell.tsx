import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function DataTableCell({
  children,
  className = "",
}: Props) {
  return (
    <td className={`p-4 ${className}`}>
      {children}
    </td>
  );
}