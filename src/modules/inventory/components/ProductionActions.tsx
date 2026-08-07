import Button from "../../../components/ui/Button";
import ViewProductButton from "./ViewProductButton";

type Props = {

  productId: string;

  onEdit: () => void;

  onDelete: () => void;

};

export default function ProductActions({

  productId,

  onEdit,

  onDelete,

}: Props) {

  return (

    <div className="flex gap-2">

      <ViewProductButton
        id={productId}
      />

      <Button onClick={onEdit}>
        Edit
      </Button>

      <Button onClick={onDelete}>
        Delete
      </Button>

    </div>

  );

}