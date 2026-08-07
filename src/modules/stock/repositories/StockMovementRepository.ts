import type {

StockMovement

}

from "../types/StockMovement";

export interface StockMovementRepository {

  getAll(): Promise<StockMovement[]>;

  create(

    movement: StockMovement

  ): Promise<StockMovement[]>;

}