import Card from "../../../components/ui/Card";

export default function ProductIdentity() {

  return (

    <Card>

      <h3 className="font-semibold">

        Identity

      </h3>

      <div className="space-y-3 mt-4">

        <div>

          SKU will be generated automatically.

        </div>

        <div>

          Barcode will be generated automatically.

        </div>

      </div>

    </Card>

  );

}