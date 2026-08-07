type Metric = {

  title: string;

  value: number;

};

export function preparePdfTable(

  metrics: Metric[],

) {

  return metrics.map(metric => [

    metric.title,

    `₦${metric.value.toLocaleString()}`,

  ]);

}