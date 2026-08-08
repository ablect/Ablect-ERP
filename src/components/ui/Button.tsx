import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

import { playUiSound } from "../../utils/uiSound";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
};

export default function Button({
  children,
  variant = "primary",
  className,
  onClick,
  disabled,
  ...props
}: Props) {
  return (
    <button
      {...props}
      disabled={disabled}
      onClick={(event) => {
        if (!disabled) {
          playUiSound(variant === "danger" ? "error" : "click");
        }
        onClick?.(event);
      }}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5",
        "font-medium transition-all duration-200 ease-out",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 focus-visible:ring-offset-2",
        "active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" &&
          "bg-red-600 text-white shadow-sm hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-md",
        variant === "secondary" &&
          "border border-slate-200 bg-white text-slate-700 shadow-sm hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md",
        variant === "danger" &&
          "bg-red-600 text-white shadow-sm hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-md",
        className,
      )}
    >
      {children}
    </button>
  );
}
