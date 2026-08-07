import type { UserRole }

from "../../auth/types/UserRole";

import type { SystemUser }

from "../types/SystemUser";

export function createSystemUser(

  name: string,

  email: string,

  role: UserRole,

): SystemUser {

  return {

    id: crypto.randomUUID(),

    name,

    email,

    role,

    active: true,

    createdAt:

      new Date().toISOString(),

  };

}