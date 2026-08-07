import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function TableCell({
  children,
}: Props) {
  return (
    <td className="p-4">
      {children}
    </td>
  );
}