type Props = {

  name: string;

};

export default function ProductAvatar({

  name,

}: Props) {

  return (

    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">

      {name.charAt(0).toUpperCase()}

    </div>

  );

}