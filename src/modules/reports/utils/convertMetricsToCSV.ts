type Metric = {

  title: string;

  value: number;

};

export function convertMetricsToCSV(

  metrics: Metric[],

) {

  const header =

    "Title,Value";

  const rows = metrics.map(

    metric =>

      `${metric.title},${metric.value}`,

  );

  return [

    header,

    ...rows,

  ].join("\n");

}