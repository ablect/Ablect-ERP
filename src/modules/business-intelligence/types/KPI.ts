export interface KPI{

id:string;

title:string;

value:number;

previousValue:number;

change:number;

trend:
|"up"
|"down"
|"flat";

format:
|"currency"
|"number"
|"percentage";

}