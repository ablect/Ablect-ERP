import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function TableBody({
  children,
}: Props) {
  return (
    <tbody>
      {children}
    </tbody>
  );
}