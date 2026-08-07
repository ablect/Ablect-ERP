import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export default function DashboardLayout({
  title,
  children,
}: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          {title}
        </h1>

        <p className="text-gray-500">
          Welcome back.
        </p>
      </div>

      {children}
    </div>
  );
}