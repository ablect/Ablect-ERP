export default function DashboardSkeleton() {

  return (

    <div className="space-y-6 animate-pulse">

      <div className="h-10 w-72 rounded-lg bg-gray-200" />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

        {[1,2,3,4,5].map((item)=>(

          <div
            key={item}
            className="h-36 rounded-2xl bg-gray-200"
          />

        ))}

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div className="h-96 rounded-2xl bg-gray-200"/>

        <div className="h-96 rounded-2xl bg-gray-200"/>

      </div>

    </div>

  );

}