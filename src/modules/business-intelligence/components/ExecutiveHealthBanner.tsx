import Card from "../../../components/ui/Card";

export default function ExecutiveHealthBanner() {

  return (

    <Card>

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold">

            Business Performing Well

          </h2>

          <p className="text-slate-500 mt-2">

            No critical operational risks detected.

          </p>

        </div>

        <div className="text-5xl">

          ✅

        </div>

      </div>

    </Card>

  );

}