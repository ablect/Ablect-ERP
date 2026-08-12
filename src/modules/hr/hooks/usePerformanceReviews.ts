import { usePerformanceReviewStore } from "../store/PerformanceReviewStore";

export function usePerformanceReviews() {
  const reviews = usePerformanceReviewStore((state) => state.reviews);
  const setReviews = usePerformanceReviewStore((state) => state.setReviews);
  return { reviews, setReviews };
}
