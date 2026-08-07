type Props = {
  title: string;
  subtitle?: string;
  description?: string;
};

export default function SectionTitle({
  title,
  subtitle,
  description,
}: Props) {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        {title}
      </h1>

      <p className="mt-1 text-gray-500">
        {description ?? subtitle}
      </p>
    </div>
  );
}