import type { Warehouse }
from "../types/Warehouse";

export function createWarehouse(

name: string,

location: string,

): Warehouse {

  return {

    id: crypto.randomUUID(),

    name,

    location,

    createdAt: new Date(),

  };

}