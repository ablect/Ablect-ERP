export type Trend =

  | "up"

  | "down"

  | "flat";

export function analyzeTrend(values: number[]): Trend {

  if (values.length < 2) {

    return "flat";

  }

  const last = values[values.length - 1];

  const previous = values[values.length - 2];

  if (last > previous) {

    return "up";

  }

  if (last < previous) {

    return "down";

  }

  return "flat";

}