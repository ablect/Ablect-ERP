import type { ReactNode } from "react";

import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import type { UserRole }

from "../types/UserRole";

type Props = {

  role: UserRole;

  children: ReactNode;

};

export default function RoleGuard({

  role,

  children,

}: Props) {

  const {

    user,

  } = useAuth();

  if (!user) {

    return <Navigate to="/login" replace />;

  }

  if (user.role !== role) {

    return <Navigate to="/unauthorized" replace />;

  }

  return <>{children}</>;

}