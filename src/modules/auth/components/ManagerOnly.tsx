import type { ReactNode }

from "react";

import RoleGuard

from "./RoleGuard";

type Props = {

  children: ReactNode;

};

export default function ManagerOnly({

  children,

}: Props) {

  return (

    <RoleGuard role="manager">

      {children}

    </RoleGuard>

  );

}