import type { ReactNode } from "react";

type Props = {

  children: ReactNode;

};

export default function PageGrid({

  children,

}: Props) {

  return (

    <div className="grid gap-6">

      {children}

    </div>

  );

}