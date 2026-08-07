export interface KPIComparison{

current:number;

previous:number;

change:number;

changePercent:number;

trend:
|"up"
|"down"
|"flat";

}