export interface Insight{

id:string;

title:string;

description:string;

severity:
|"info"
|"warning"
|"success"
|"critical";

metricId:string;

createdAt:Date;

}