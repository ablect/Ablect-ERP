import type {
  Recommendation,
} from "../types/Recommendation";

import RecommendationStatusBadge from "./RecommendationStatusBadge";
import AssignRecommendationButton from "./AssignRecommendationButton";
import {
  useRecommendationActions,
} from "../hooks/useRecommendationActions";

type Props = {

  recommendation: Recommendation;

};

export default function RecommendationCard({

  recommendation,

}: Props) {

  const {

    resolve,

    dismiss,

  } = useRecommendationActions();

  return (

    <div className="rounded-lg border p-4 bg-white shadow-sm">

      <div className="flex justify-between items-start">

        <h4 className="font-semibold">

          {recommendation.title}

        </h4>

        <RecommendationStatusBadge

          status={recommendation.status}
        
        />
          <AssignRecommendationButton

        recommendationId={recommendation.id}

        
        />

      </div>

      <p className="mt-2 text-sm text-gray-600">

        {recommendation.description}

      </p>

      <button

        className="mt-4 px-3 py-2 rounded bg-blue-600 text-white"

      >

        {recommendation.action}

      </button>

      <div className="mt-4 flex gap-3">

        <button

          className="rounded bg-green-600 px-3 py-2 text-white"

          onClick={() => resolve(recommendation.id)}

        >

          Resolve

        </button>

        <button

          className="rounded bg-red-600 px-3 py-2 text-white"

          onClick={() => dismiss(recommendation.id)}

        >

          Dismiss

        </button>

      </div>

    </div>

  );

}