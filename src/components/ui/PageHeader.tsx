import type { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  action,
}: Props) {
  return (
    <div className="flex justify-between items-center mb-8">

      <div>

        <h1 className="text-3xl font-bold">
          {title}
        </h1>

        <p className="text-slate-500 mt-1">
          {subtitle}
        </p>

      </div>

      {action}

    </div>
  );
}