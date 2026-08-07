import type { ReactNode } from "react";

type Props = {

  title: string;

  subtitle?: string;

  children: ReactNode;

};

export default function PageSection({

  title,

  subtitle,

  children,

}: Props) {

  return (

    <section className="space-y-6">

      <div>

        <h2 className="text-2xl font-bold">

          {title}

        </h2>

        {subtitle && (

          <p className="mt-2 text-slate-500">

            {subtitle}

          </p>

        )}

      </div>

      {children}

    </section>

  );

}