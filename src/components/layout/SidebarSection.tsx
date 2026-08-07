import type { ReactNode } from "react";

type Props = {

  title: string;

  children: ReactNode;

};

export default function SidebarSection({

  title,

  children,

}: Props) {

  return (

    <div className="space-y-3">

      <h3 className="px-4 text-xs font-semibold uppercase tracking-wider text-slate-400">

        {title}

      </h3>

      <div className="space-y-1">

        {children}

      </div>

    </div>

  );

}