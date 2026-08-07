type Props = {

  title: string;

  description: string;

};

export default function EmptyState({

  title,

  description,

}: Props) {

  return (

    <div className="rounded-xl border border-dashed py-20 text-center">

      <h2 className="text-xl font-semibold">

        {title}

      </h2>

      <p className="mt-3 text-slate-500">

        {description}

      </p>

    </div>

  );

}