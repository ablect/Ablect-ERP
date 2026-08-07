import type { UserRole }
from "../../auth/types/UserRole";

export interface SystemUser {

  id: string;

  name: string;

  email: string;

  role: UserRole;

  active: boolean;

  createdAt: string;

}