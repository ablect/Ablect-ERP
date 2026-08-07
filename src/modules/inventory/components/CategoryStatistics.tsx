import { useCategoryStore } from "../store/CategoryStore";

import QuickStat from "./QuickStat";

export default function CategoryStatistics() {

  const {

    categories,

  } = useCategoryStore();

  return (

    <QuickStat

      title="Categories"

      value={categories.length}

    />

  );

}