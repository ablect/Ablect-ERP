export interface MaintenanceRecord{

  id:string;

  assetId:string;

  maintenanceType:
    |"Preventive"
    |"Corrective";

  provider:string;

  scheduledDate:string;

  completedDate:string;

  cost:number;

  description:string;

  status:
    |"Scheduled"
    |"In Progress"
    |"Completed";

}