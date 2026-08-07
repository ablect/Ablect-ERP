import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
};

export default function IconButton({
  icon,
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className="
      flex
      items-center
      gap-2
      rounded-xl
      border
      border-slate-200
      bg-white
      px-4
      py-2
      shadow-sm
      transition
      hover:bg-slate-50
      "
    >
      {icon}
      {children}
    </button>
  );
}