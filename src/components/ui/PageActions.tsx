import type { ReactNode } from "react";

type Props = {

  children: ReactNode;

};

export default function PageActions({

  children,

}: Props) {

  return (

    <div className="flex flex-wrap gap-4 justify-end">

      {children}

    </div>

  );

}