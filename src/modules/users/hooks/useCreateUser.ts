import { createSystemUser }
from "../utils/createSystemUser";

import { userService }
from "../services/UserService";

import { useUserStore }
from "../store/UserStore";

import type { UserRole }
from "../../auth/types/UserRole";

export function useCreateUser() {

  async function create(

    name: string,

    email: string,

    role: UserRole,

  ) {

    const user = createSystemUser(

      name,

      email,

      role,

    );

    const users =

      await userService.create(

        user,

      );

    useUserStore

      .getState()

      .setUsers(

        users,

      );

  }

  return {

    create,

  };

}