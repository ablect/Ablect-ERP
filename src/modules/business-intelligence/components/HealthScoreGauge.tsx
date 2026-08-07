type Props = {

  score: number;

};

export default function HealthScoreGauge({

  score,

}: Props) {

  const colour =

    score >= 90

      ? "text-green-600"

      : score >= 75

      ? "text-blue-600"

      : score >= 60

      ? "text-yellow-600"

      : "text-red-600";

  return (

    <div className="flex flex-col items-center justify-center">

      <div

        className={`h-24 w-24 rounded-full border-8 border-slate-200 flex items-center justify-center text-2xl font-bold ${colour}`}

      >

        {score}

      </div>

      <p className="mt-2 text-xs text-slate-500">

        Health Score

      </p>

    </div>

  );

}