import Card from "../../../components/ui/Card";

export default function ProductStatus() {

  return (

    <Card>

      <h3 className="font-semibold">

        Product Status

      </h3>

      <div className="mt-5 space-y-2">

        <p>Draft</p>

        <p>Not yet saved</p>

      </div>

    </Card>

  );

}