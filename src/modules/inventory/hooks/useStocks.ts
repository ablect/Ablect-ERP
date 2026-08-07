import { useInventoryStore } from "../store/InventoryStore";
import { stockService } from "../services/StockService";

export function useStock(){

const{

products

}=useInventoryStore();

return{

value:

stockService.calculateValue(products),

low:

stockService.lowStock(products),

out:

stockService.outOfStock(products)

};

}