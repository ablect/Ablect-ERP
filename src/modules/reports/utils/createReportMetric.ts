import type {

ReportMetric

}

from "../types/ReportMetric";

export function createReportMetric(

title:string,

value:number,

):ReportMetric{

return{

title,

value,

};

}