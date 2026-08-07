type Props = {
  title: string;
  subtitle: string;
};

export default function PageHeaderModern({
  title,
  subtitle,
}: Props) {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        {title}
      </h1>

      <p className="mt-2 text-slate-500">
        {subtitle}
      </p>
    </div>
  );
}