import Card from "../../../components/ui/Card";

import { useProductDetailsStore }
from "../store/ProductDetailsStore";

export default function ProductDetailsDrawer() {

  const {

    open,

    selectedProductId,

    close,

  } = useProductDetailsStore();

  if (!open) {

    return null;

  }

  return (

    <div className="fixed inset-0 z-50 bg-black/40">

      <div className="absolute right-0 top-0 h-full w-[420px] bg-white shadow-xl">

        <Card>

          <div className="space-y-5">

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-bold">

                Product Details

              </h2>

              <button
                onClick={close}
              >

                ✕

              </button>

            </div>

            <p>

              Product ID:

            </p>

            <p className="font-semibold">

              {selectedProductId}

            </p>

          </div>

        </Card>

      </div>

    </div>

  );

}