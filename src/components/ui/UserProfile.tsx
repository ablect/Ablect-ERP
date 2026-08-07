import Avatar from "./Avatar";

export default function UserProfile() {

  return (

    <div className="flex items-center gap-3">

      <Avatar name="Ablect Admin" />

      <div>

        <h3 className="font-semibold">

          Ablect Admin

        </h3>

        <p className="text-xs text-slate-500">

          Administrator

        </p>

      </div>

    </div>

  );

}