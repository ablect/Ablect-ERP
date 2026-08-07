import type { ReactNode } from "react";

type Props = {

  title: string;

  value: string;

  icon?: ReactNode;

  color?: string;

};

export default function InfoCard({

  title,

  value,

  icon,

  color = "#2563eb",

}: Props) {

  return (

    <div
      className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200"
    >

      <div className="flex justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2
            className="mt-3 text-3xl font-bold"
            style={{ color }}
          >
            {value}
          </h2>

        </div>

        <div>
          {icon}
        </div>

      </div>

    </div>

  );

}