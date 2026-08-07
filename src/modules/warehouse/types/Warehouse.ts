export interface Warehouse{

  id:string;

  code:string;

  name:string;

  location:string;

  manager:string;

  capacity:number;

  currentStock:number;

  status:
    |"Active"
    |"Inactive";

}