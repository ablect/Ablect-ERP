import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

export default function Form({
  children,
  onSubmit,
}: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-8"
    >
      {children}
    </form>
  );
}