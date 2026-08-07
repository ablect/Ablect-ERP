import SectionTitle from "../../../components/ui/SectionTitle";
import Button from "../../../components/ui/Button";

export default function ProductHeader() {

  return (

    <div className="flex items-center justify-between">

      <SectionTitle

        title="New Product"

        subtitle="Create a new inventory product."

      />

      <Button type="submit">

Save Product

</Button>

    </div>

  );

}