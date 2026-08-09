import { useSupplyChainStore } from "../../supplyChain/store/useSupplyChainStore";

export function useReceivePurchase() {
  const receivePurchaseOrder = useSupplyChainStore((state) => state.receivePurchaseOrder);

  async function complete(_grnId: string, purchaseOrderId: string, _productId: string, _warehouseId: string, _quantity: number) {
    await receivePurchaseOrder(purchaseOrderId);
  }

  return { complete };
}
