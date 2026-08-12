export interface ClientRuntimeConfig {
  businessName: string;
  installationDate: string;
  logoPath: string | null;
  logoDataUrl: string | null;
  configPath: string;
}

export interface DatabaseRuntimeStatus {
  connected: boolean;
  error: string | null;
}

export interface ProductRecord {
  id: number;
  barcode: string | null;
  sku: string | null;
  name: string;
  category: string | null;
  unit: string | null;
  cost_price: number;
  selling_price: number;
  quantity: number;
  minimum_stock: number;
  created_at: string;
  updated_at: string;
}

export interface CustomerRecord {
  id: number;
  customer_code: string;
  full_name: string;
  business_name: string | null;
  phone: string | null;
  email: string | null;
  customer_type: string;
  loyalty_points: number;
  credit_limit: number;
  credit_balance: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SupplierRecord {
  id: number;
  supplier_code: string;
  name: string;
  contact_person: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  lead_time_days: number;
  payment_terms: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface WarehouseRecord {
  id: number;
  name: string;
  code: string;
  address: string | null;
  is_active: boolean;
  total_units: number;
  product_count: number;
}

export interface DashboardMetrics {
  sales: { revenue: number; transactions: number };
  stock: { stock_value: number; low_stock_items: number };
  customers: { active_customers: number };
}

export interface CreateSalePayload {
  saleNumber: string;
  customerId?: number | null;
  warehouseId?: number | null;
  userId?: number | null;
  paymentMethod?: string | null;
  paidAmount?: number;
  items: Array<{
    productId: number;
    quantity: number;
    unitPrice?: number;
    discount?: number;
    tax?: number;
  }>;
}

export interface ReceivePurchasePayload {
  purchaseOrderId: number;
  userId?: number | null;
}

export interface TransferStockPayload {
  productId: number;
  sourceWarehouseId: number;
  destinationWarehouseId: number;
  quantity: number;
  userId?: number | null;
  referenceId?: string | null;
}

interface DesktopBridge {
  getClientConfig(): Promise<ClientRuntimeConfig>;
  getDatabaseStatus(): Promise<DatabaseRuntimeStatus>;
  erp: {
    products: { list(search?: string): Promise<ProductRecord[]> };
    customers: { list(search?: string): Promise<CustomerRecord[]> };
    suppliers: { list(search?: string): Promise<SupplierRecord[]> };
    warehouses: { list(): Promise<WarehouseRecord[]> };
    dashboard: { metrics(): Promise<DashboardMetrics> };
    sales: { create(payload: CreateSalePayload): Promise<unknown> };
    purchases: { receive(payload: ReceivePurchasePayload): Promise<unknown> };
    stock: { transfer(payload: TransferStockPayload): Promise<unknown> };
  };
}

declare global {
  interface Window {
    ablectDesktop?: DesktopBridge;
  }
}

function requireDesktopBridge(): DesktopBridge {
  if (!window.ablectDesktop) {
    throw new Error("Ablect Desktop runtime is not available. Start the application through Electron.");
  }
  return window.ablectDesktop;
}

export const desktopRuntime = {
  getClientConfig: () => requireDesktopBridge().getClientConfig(),
  getDatabaseStatus: () => requireDesktopBridge().getDatabaseStatus(),
  products: { list: (search = "") => requireDesktopBridge().erp.products.list(search) },
  customers: { list: (search = "") => requireDesktopBridge().erp.customers.list(search) },
  suppliers: { list: (search = "") => requireDesktopBridge().erp.suppliers.list(search) },
  warehouses: { list: () => requireDesktopBridge().erp.warehouses.list() },
  dashboard: { metrics: () => requireDesktopBridge().erp.dashboard.metrics() },
  sales: { create: (payload: CreateSalePayload) => requireDesktopBridge().erp.sales.create(payload) },
  purchases: { receive: (payload: ReceivePurchasePayload) => requireDesktopBridge().erp.purchases.receive(payload) },
  stock: { transfer: (payload: TransferStockPayload) => requireDesktopBridge().erp.stock.transfer(payload) },
};
