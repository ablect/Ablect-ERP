type Props = {

  active?: boolean;

  onClick: () => void;

  children: React.ReactNode;

};

export default function PaginationButton({

  active,

  onClick,

  children,

}: Props) {

  return (

    <button

      onClick={onClick}

      className={

        active

          ? "rounded border bg-blue-600 px-3 py-2 text-white"

          : "rounded border px-3 py-2"

      }

    >

      {children}

    </button>

  );

}