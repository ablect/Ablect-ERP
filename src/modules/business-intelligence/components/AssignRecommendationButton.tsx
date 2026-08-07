type Props = {

  recommendationId: string;

};

export default function AssignRecommendationButton({

  recommendationId,

}: Props) {

  return (

    <button

      onClick={() => {

        console.log("Assign recommendation:", recommendationId);

      }}

      className="rounded-lg border px-4 py-2 hover:bg-slate-100"

    >

      Assign

    </button>

  );

}