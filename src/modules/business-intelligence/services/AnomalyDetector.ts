export function detectAnomaly(

  value: number,

  average: number,

) {

  if (average === 0) {

    return false;

  }

  return Math.abs(value - average) > average * 0.4;

}