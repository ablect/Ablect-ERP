import Card from "../../../components/ui/Card";

import ProductDetailsSection from "./ProductDetailsSection";
import ProductHistory from "./ProductHistory";

import { useProductDetailsStore } from "../store/ProductDetailsStore";

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

      <div className="absolute right-0 top-0 h-full w-[420px] bg-white shadow-xl overflow-y-auto">

        <Card>

          <div className="space-y-6">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-bold">

                Product Details

              </h2>

              <button

                onClick={close}

                className="rounded-md border px-3 py-1 hover:bg-slate-100"

              >

                ✕

              </button>

            </div>

            <ProductDetailsSection />

            <ProductHistory />

            <div className="border-t pt-4">

              <p className="text-xs text-slate-400">

                Product ID

              </p>

              <p className="font-medium">

                {selectedProductId}

              </p>

            </div>

          </div>

        </Card>

      </div>

    </div>

  );

}