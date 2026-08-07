import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";

type Props = {

  open: boolean;

  onClose: () => void;

  onDelete: () => void;

};

export default function DeleteProductDialog({

  open,

  onClose,

  onDelete,

}: Props) {

  return (

    <Modal

      open={open}

      title="Delete Product"

      onClose={onClose}

    >

      <p className="mb-8">

        Are you sure you want to delete this product?

      </p>

      <div className="flex justify-end gap-3">

        <Button onClick={onClose}>

          Cancel

        </Button>

        <Button onClick={onDelete}>

          Delete

        </Button>

      </div>

    </Modal>

  );

}