import type {

StockMovement

}

from "../types/StockMovement";

import type {

StockMovementRepository

}

from "./StockMovementRepository";

export class StockMovementMemoryRepository

implements StockMovementRepository {

  private movements:

  StockMovement[] = [];

  async getAll() {

    return this.movements;

  }

  async create(

    movement: StockMovement

  ) {

    this.movements.push(

      movement

    );

    return this.movements;

  }

}