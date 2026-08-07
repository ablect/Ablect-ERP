import Button from "../../../components/ui/Button";

type Props = {

  customerId: string;

  onEdit: () => void;

  onDelete: () => void;

};

export default function CustomerActions({

  customerId: _customerId,

  onEdit,

  onDelete,

}: Props) {

  return (

    <div className="flex gap-2">

      <Button onClick={onEdit}>
        Edit
      </Button>

      <Button onClick={onDelete}>
        Delete
      </Button>

    </div>

  );

}