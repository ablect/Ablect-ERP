type Props = {

  children: React.ReactNode;

};

export default function TableHeader({

  children,

}: Props) {

  return (

    <th className="bg-slate-100 p-3 text-left font-semibold">

      {children}

    </th>

  );

}