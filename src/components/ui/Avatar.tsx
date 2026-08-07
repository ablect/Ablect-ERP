type Props = {
  name: string;
};

export default function Avatar({ name }: Props) {

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div
      className="
      h-11
      w-11
      rounded-full
      bg-blue-600
      text-white
      flex
      items-center
      justify-center
      font-bold
      "
    >
      {initials}
    </div>
  );
}