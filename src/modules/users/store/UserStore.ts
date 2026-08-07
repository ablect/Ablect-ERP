import { create } from "zustand";

import type { SystemUser }
from "../types/SystemUser";

type UserState = {

  users: SystemUser[];

  setUsers: (

    users: SystemUser[],

  ) => void;

};

export const useUserStore =
create<UserState>((set) => ({

  users: [],

  setUsers(users) {

    set({

      users,

    });

  },

}));