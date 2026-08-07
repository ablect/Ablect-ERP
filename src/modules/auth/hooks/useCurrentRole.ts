import { useAuth }

from "./useAuth";

export function useCurrentRole() {

  const {

    user,

  } = useAuth();

  return user?.role;

}