import type { Unit } from "../types/Unit";

export interface UnitRepository {

  getAll(): Promise<Unit[]>;

  create(unit: Unit): Promise<Unit[]>;

}