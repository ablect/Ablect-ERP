import { create } from "zustand";

import { inventoryService } from "../../inventory/services/InventoryService";
import { useInventoryStore } from "../../inventory/store/InventoryStore";
import { supplierService } from "../../suppliers/services/SupplierService";
import { purchaseService } from "../../purchases/services/PurchaseService";
import { warehouseService } from "../../warehouse/services/WarehouseService";
import type { Supplier } from "../../suppliers/types/Supplier";
import type { Warehouse } from "../../warehouse/types/Warehouse";
import type { InventoryItem } from "../../inventory/types/InventoryItem";

export type PurchaseStatus = "Draft" | "Pending" | "Partially Received" | "Received" | "Cancelled";
export type MovementType = "In" | "Out" | "Transfer" | "Adjustment";

export interface PurchaseLine {
  id: string;
  productId: string;
  quantity: number;
  receivedQuantity: number;
  unitCost: number;
}

export interface PurchaseOrder {
  id: string;
  number: string;
  supplierId: string;
  warehouseId: string;
  orderDate: string;
  expectedDate: string;
  status: PurchaseStatus;
  notes: string;
  lines: PurchaseLine[];
  totalAmount: number;
}

export interface StockMovement {
  id: string;
  date: string;
  reference: string;
  type: MovementType;
  productId: string;
  sourceWarehouseId?: string;
  destinationWarehouseId?: string;
  quantity: number;
  user: string;
}

interface SupplyChainState {
  suppliers: Supplier[];
  warehouses: Warehouse[];
  purchases: PurchaseOrder[];
  movements: StockMovement[];
  loading: boolean;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  createPurchase: (input: Omit<PurchaseOrder, "id" | "number" | "totalAmount" | "status"> & { status?: PurchaseStatus }) => Promise<void>;
  receivePurchaseOrder: (id: string, quantities?: Record<string, number>) => Promise<void>;
  transferStock: (productId: string, sourceWarehouseId: string, destinationWarehouseId: string, quantity: number) => void;
  addSupplier: (supplier: Supplier) => Promise<void>;
  addWarehouse: (warehouse: Warehouse) => Promise<void>;
}

const today = () => new Date().toISOString();

const seedSuppliers: Supplier[] = [
  { id: "sup-001", name: "FreshFields Distribution", contactPerson: "Amina Yusuf", phone: "08030001111", email: "orders@freshfields.example", address: "Ibadan, Oyo", active: true, createdAt: today() },
  { id: "sup-002", name: "Prime Consumer Goods", contactPerson: "Daniel Okafor", phone: "08030002222", email: "sales@primegoods.example", address: "Lagos, Nigeria", active: true, createdAt: today() },
  { id: "sup-003", name: "Westline Industrial Supply", contactPerson: "Tunde Adeyemi", phone: "08030003333", email: "procurement@westline.example", address: "Abeokuta, Ogun", active: true, createdAt: today() },
];

const seedWarehouses: Warehouse[] = [
  { id: "wh-main", code: "MAIN", name: "Main Warehouse", location: "Apata, Ibadan", manager: "Warehouse Team", capacity: 10000, currentStock: 4200, status: "Active" },
  { id: "wh-lagos", code: "LAG", name: "Lagos Hub", location: "Ikeja, Lagos", manager: "Logistics Team", capacity: 7000, currentStock: 3100, status: "Active" },
];

const seedPurchases: PurchaseOrder[] = [
  { id: "po-1024", number: "PO-1024", supplierId: "sup-001", warehouseId: "wh-main", orderDate: today(), expectedDate: today(), status: "Pending", notes: "Weekly replenishment", lines: [], totalAmount: 0 },
];

export const useSupplyChainStore = create<SupplyChainState>((set, get) => ({
  suppliers: [],
  warehouses: [],
  purchases: [],
  movements: [],
  loading: false,
  hydrated: false,

  async hydrate() {
    if (get().hydrated || get().loading) return;
    set({ loading: true });
    try {
      const [suppliers, warehouses, purchases, inventory] = await Promise.all([
        supplierService.getAll(),
        warehouseService.getAll(),
        purchaseService.getAll(),
        inventoryService.getAll(),
      ]);

      const finalSuppliers = suppliers.length ? suppliers : seedSuppliers;
      const finalWarehouses = warehouses.length ? warehouses : seedWarehouses;
      const finalPurchases = purchases.length ? purchases.map((p) => ({
        id: p.id,
        number: p.invoiceNumber,
        supplierId: p.supplierId,
        warehouseId: finalWarehouses[0]?.id ?? "",
        orderDate: p.purchaseDate.toISOString(),
        expectedDate: p.purchaseDate.toISOString(),
        status: p.status === "Completed" ? "Received" : "Draft",
        notes: "Imported purchase record",
        lines: [],
        totalAmount: p.totalAmount,
      } as PurchaseOrder)) : seedPurchases;

      useInventoryStore.getState().setItems(inventory);
      set({ suppliers: finalSuppliers, warehouses: finalWarehouses, purchases: finalPurchases, loading: false, hydrated: true });
    } catch {
      set({ suppliers: seedSuppliers, warehouses: seedWarehouses, purchases: seedPurchases, loading: false, hydrated: true });
    }
  },

  async createPurchase(input) {
    const lines = input.lines.map((line) => ({ ...line, quantity: Math.max(0, line.quantity), receivedQuantity: 0 }));
    const totalAmount = lines.reduce((sum, line) => sum + line.quantity * line.unitCost, 0);
    const purchase: PurchaseOrder = {
      ...input,
      id: crypto.randomUUID(),
      number: `PO-${Date.now().toString().slice(-6)}`,
      status: input.status ?? "Draft",
      lines,
      totalAmount,
    };
    set({ purchases: [purchase, ...get().purchases] });
    await purchaseService.create({
      id: purchase.id,
      supplierId: purchase.supplierId,
      invoiceNumber: purchase.number,
      purchaseDate: new Date(purchase.orderDate),
      totalAmount: purchase.totalAmount,
      status: purchase.status === "Received" ? "Completed" : "Draft",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  async receivePurchaseOrder(id, quantities) {
    const purchase = get().purchases.find((item) => item.id === id);
    if (!purchase || purchase.status === "Received") return;
    const inventory = useInventoryStore.getState().items;
    const movements: StockMovement[] = [];
    const nextInventory = [...inventory];
    const receiveMap = quantities ?? Object.fromEntries(purchase.lines.map((line) => [line.id, line.quantity - line.receivedQuantity]));

    for (const line of purchase.lines) {
      const qty = Math.max(0, Math.min(line.quantity - line.receivedQuantity, Number(receiveMap[line.id] ?? 0)));
      if (!qty) continue;
      const index = nextInventory.findIndex((item) => item.id === line.productId);
      if (index >= 0) {
        const item = nextInventory[index];
        const nextQty = item.quantity + qty;
        nextInventory[index] = { ...item, quantity: nextQty, status: nextQty <= item.reorderLevel ? "Low Stock" : "In Stock" };
      }
      movements.push({ id: crypto.randomUUID(), date: today(), reference: purchase.number, type: "In", productId: line.productId, destinationWarehouseId: purchase.warehouseId, quantity: qty, user: "Current User" });
    }

    const nextLines = purchase.lines.map((line) => ({ ...line, receivedQuantity: line.receivedQuantity + Number(receiveMap[line.id] ?? 0) }));
    const fullyReceived = nextLines.every((line) => line.receivedQuantity >= line.quantity);
    const nextPurchase = { ...purchase, lines: nextLines, status: fullyReceived ? "Received" : "Partially Received" as PurchaseStatus };
    set({ purchases: get().purchases.map((item) => item.id === id ? nextPurchase : item), movements: [...movements, ...get().movements] });
    useInventoryStore.getState().setItems(nextInventory);
    if (movements.length) {
      await Promise.all(nextInventory.map((item) => inventoryService.update(item)));
      await purchaseService.update({ id: purchase.id, supplierId: purchase.supplierId, invoiceNumber: purchase.number, purchaseDate: new Date(purchase.orderDate), totalAmount: purchase.totalAmount, status: fullyReceived ? "Completed" : "Draft", createdAt: new Date(purchase.orderDate), updatedAt: new Date() });
    }
  },

  transferStock(productId, sourceWarehouseId, destinationWarehouseId, quantity) {
    const qty = Math.max(0, Number(quantity) || 0);
    if (!qty || sourceWarehouseId === destinationWarehouseId) return;
    const movement: StockMovement = { id: crypto.randomUUID(), date: today(), reference: `TR-${Date.now().toString().slice(-6)}`, type: "Transfer", productId, sourceWarehouseId, destinationWarehouseId, quantity: qty, user: "Current User" };
    set({ movements: [movement, ...get().movements] });
  },

  async addSupplier(supplier) {
    const suppliers = await supplierService.create(supplier);
    set({ suppliers });
  },

  async addWarehouse(warehouse) {
    const warehouses = await warehouseService.create(warehouse);
    set({ warehouses });
  },
}));

export type SupplyChainProduct = Pick<InventoryItem, "id" | "itemName" | "sku" | "quantity" | "unitCost" | "sellingPrice" | "category">;
