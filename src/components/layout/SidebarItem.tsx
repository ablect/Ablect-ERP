import type { ReactNode } from "react";

type Props = {

  icon?: ReactNode;

  label: string;

  active?: boolean;

};

export default function SidebarItem({

  icon,

  label,

  active,

}: Props) {

  return (

    <button

      className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition

      ${

        active

          ? "bg-red-600 text-white"

          : "text-slate-600 hover:bg-slate-100"

      }`}

    >

      {icon}

      <span>

        {label}

      </span>

    </button>

  );

}