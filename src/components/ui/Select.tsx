import type { SelectHTMLAttributes } from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({
  children,
  className = "",
  ...props
}: Props) {
  return (
    <select
      {...props}
      className={`
        w-full
        rounded-xl
        border
        border-slate-300
        bg-white
        px-4
        py-3
        text-sm
        outline-none
        transition
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-200
        ${className}
      `}
    >
      {children}
    </select>
  );
}