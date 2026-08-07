import { useAuth }

from "../hooks/useAuth";

export default function AuthStatus() {

  const {

    user,

  } = useAuth();

  return (

    <div className="text-sm text-slate-500">

      {user

        ? `Logged in as ${user.name}`

        : "Not Logged In"}

    </div>

  );

}