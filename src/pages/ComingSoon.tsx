type Props = {
  title: string;
  description?: string;
};

export default function ComingSoon({ title, description }: Props) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-3 text-gray-500">
          {description ?? "This module is connected and will be completed in the next integration stage."}
        </p>
      </div>
    </div>
  );
}