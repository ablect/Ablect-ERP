import { useFixedAssetStore } from "../store/FixedAssetStore";
import type { FixedAsset } from "../types/FixedAsset";

export function useFixedAssets() {
  return useFixedAssetStore();
}

export function useCreateFixedAsset() {
  const setAssets = useFixedAssetStore((state) => state.setAssets);
  const assets = useFixedAssetStore((state) => state.assets);

  async function create(assetCode: string, assetName: string, category: string, purchaseDate: string, purchaseCost: number, usefulLife: number, salvageValue: number, location: string) {
    const asset: FixedAsset = {
      id: crypto.randomUUID(), assetCode, assetName, category, purchaseDate,
      purchaseCost, usefulLife, salvageValue, currentValue: Math.max(0, purchaseCost - salvageValue), location, status: "Active",
    };
    setAssets([...assets, asset]);
  }

  return { create };
}
