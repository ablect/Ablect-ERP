import { useUsers } from "../hooks/useUsers";
import { useDeleteUser } from "../hooks/useDeleteUser";

import UserRoleBadge from "./UserRoleBadge";
import UserStatusBadge from "./UserStatusBadge";
import UserAvatar from "./UserAvatar";
import UserActions from "./UserActions";
import UserEmptyState from "./UserEmptyState";

export default function UserTable() {

  const { users } = useUsers();

  const { remove } = useDeleteUser();

  if (users.length === 0) {
    return <UserEmptyState />;
  }

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-3 text-left">
              Name
            </th>

            <th className="p-3 text-left">
              Email
            </th>

            <th className="p-3 text-left">
              Role
            </th>

            <th className="p-3 text-left">
              Status
            </th>

            <th className="p-3 text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr
              key={user.id}
              className="border-t"
            >

              <td className="p-3">
                <div className="flex items-center gap-3">
                  <UserAvatar name={user.name} />
                  <span>{user.name}</span>
                </div>
              </td>

              <td className="p-3">
                {user.email}
              </td>

              <td className="p-3">
                <UserRoleBadge role={user.role} />
              </td>

              <td className="p-3">
                <UserStatusBadge active={user.active} />
              </td>

              <td className="p-3">

                <UserActions
                  onEdit={() => {}}
                  onDelete={() => remove(user.id)}
                />

              </td>

            </tr>

          ))}

        </tbody>

      </table>
    </div>
  );

}