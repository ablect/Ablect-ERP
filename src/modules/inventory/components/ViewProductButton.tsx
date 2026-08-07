import Button from "../../../components/ui/Button";

import {

useProductDetailsStore

}

from "../store/ProductDetailsStore";

type Props = {

  id: string;

};

export default function ViewProductButton({

  id,

}: Props) {

  const {

    openProduct,

  } = useProductDetailsStore();

  return (

    <Button

      onClick={() =>

        openProduct(id)

      }

    >

      View

    </Button>

  );

}