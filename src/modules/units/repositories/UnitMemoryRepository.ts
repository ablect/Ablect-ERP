import type { Unit } from "../types/Unit";

import type { UnitRepository }

from "./UnitRepository";

export class UnitMemoryRepository

implements UnitRepository {

  private units: Unit[] = [];

  async getAll() {

    return this.units;

  }

  async create(unit: Unit) {

    this.units.push(unit);

    return this.units;

  }

}