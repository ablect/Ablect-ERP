export interface DashboardAlert{

id:string;

title:string;

severity:

|"info"

|"warning"

|"critical";

}

export function getDashboardAlerts():DashboardAlert[]{

return[

{

id:"1",

title:"No critical alerts",

severity:"info",

},

];

}