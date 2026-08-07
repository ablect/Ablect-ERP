import type { User }

from "../types/User";

import type { UserRole }

from "../types/UserRole";

export function hasRole(

  user: User | null,

  role: UserRole,

) {

  return user?.role === role;

}