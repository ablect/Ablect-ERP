export function forecastExpenses(values: number[]) {

  if (values.length === 0) {

    return 0;

  }

  const total = values.reduce(

    (sum, value) => sum + value,

    0,

  );

  return Math.round(total / values.length);

}