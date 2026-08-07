import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
};

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={clsx(
        "px-4 py-2 rounded-xl font-medium transition-all duration-200",
        "active:scale-95",
        variant === "primary" &&
          "bg-blue-600 hover:bg-blue-700 text-white",
        variant === "secondary" &&
          "bg-gray-100 hover:bg-gray-200",
        variant === "danger" &&
          "bg-red-600 hover:bg-red-700 text-white",
        className
      )}
    >
      {children}
    </button>
  );
}