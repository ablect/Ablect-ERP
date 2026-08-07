import type { ReactNode } from "react";

type Props = {

  sidebar: ReactNode;

  header: ReactNode;

  children: ReactNode;

};

export default function AppShell({

  sidebar,

  header,

  children,

}: Props) {

  return (

    <div className="flex h-screen bg-slate-50">

      {sidebar}

      <div className="flex flex-1 flex-col overflow-hidden">

        {header}

        <main className="flex-1 overflow-y-auto p-6">

          {children}

        </main>

      </div>

    </div>

  );

}