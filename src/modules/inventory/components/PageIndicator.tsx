type Props = {

  page: number;

  totalPages: number;

};

export default function PageIndicator({

  page,

  totalPages,

}: Props) {

  return (

    <p className="text-sm text-slate-500">

      Page {page} of {totalPages}

    </p>

  );

}