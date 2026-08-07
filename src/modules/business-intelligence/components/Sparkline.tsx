type Props = {

  values: number[];

};

export default function Sparkline({

  values,

}: Props) {

  if (values.length === 0) {

    return null;

  }

  const max = Math.max(...values);

  const min = Math.min(...values);

  const range = max - min || 1;

  const width = 120;

  const height = 40;

  const step = width / (values.length - 1);

  const points = values
    .map((value, index) => {

      const x = index * step;

      const y =
        height -
        ((value - min) / range) * height;

      return `${x},${y}`;

    })
    .join(" ");

  return (

    <svg
      width={width}
      height={height}
    >

      <polyline
        fill="none"
        stroke="#2563eb"
        strokeWidth="2"
        points={points}
      />

    </svg>

  );

}