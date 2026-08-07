import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  columns?: 2 | 3 | 4;
};

export default function Grid({
  children,
  columns = 4,
}: Props) {

  const map = {
    2: "md:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "xl:grid-cols-4",
  };

  return (
    <div className={`grid grid-cols-1 gap-6 ${map[columns]}`}>
      {children}
    </div>
  );
}