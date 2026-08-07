import { userService }
from "../services/UserService";

import { useUserStore }
from "../store/UserStore";

export function useDeleteUser() {

  async function remove(

    id: string,

  ) {

    const users =

      await userService.delete(

        id,

      );

    useUserStore

      .getState()

      .setUsers(

        users,

      );

  }

  return {

    remove,

  };

}