import type { ReactNode } from "react";

import Card from "./Card";

type Props = {

  children: ReactNode;

};

export default function ContentCard({

  children,

}: Props) {

  return (

    <Card>

      <div className="p-2">

        {children}

      </div>

    </Card>

  );

}