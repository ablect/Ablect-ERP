import type { ReactNode } from "react";

type Props = {

  children: ReactNode;

};

export default function TableContainer({

  children,

}: Props) {

  return (

    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

      <div className="overflow-x-auto">

        {children}

      </div>

    </div>

  );

}