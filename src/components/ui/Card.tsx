import type { ReactNode } from "react";

type Props = {

  children: ReactNode;

  className?: string;

};

export default function Card({

  children,

  className = "",

}: Props) {

  return (

    <div

      className={`rounded-2xl bg-white shadow-sm border border-slate-200 p-6 ${className}`}

    >

      {children}

    </div>

  );

}