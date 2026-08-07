import type { ReactNode }

from "react";

import RoleGuard

from "./RoleGuard";

type Props = {

  children: ReactNode;

};

export default function AdminOnly({

  children,

}: Props) {

  return (

    <RoleGuard role="admin">

      {children}

    </RoleGuard>

  );

}