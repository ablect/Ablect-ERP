import type { Supplier } from "../types/Supplier";

export interface SupplierRepository {

  getAll(): Promise<Supplier[]>;

  create(supplier: Supplier): Promise<Supplier[]>;

}