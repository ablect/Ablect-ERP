import type { ReactNode } from "react";

import Card from "./Card";

type Props = {

  title: string;

  value: string | number;

  subtitle?: string;

  icon?: ReactNode;

};

export default function StatCard({

  title,

  value,

  subtitle,

  icon,

}: Props) {

  return (

    <Card>

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">

            {title}

          </p>

          <h2 className="mt-2 text-3xl font-bold">

            {value}

          </h2>

          {subtitle && (

            <p className="mt-2 text-xs text-slate-400">

              {subtitle}

            </p>

          )}

        </div>

        {icon}

      </div>

    </Card>

  );

}