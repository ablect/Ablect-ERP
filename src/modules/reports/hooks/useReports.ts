import {

useReportStore

}

from "../store/ReportStore";

export function useReports(){

const{

metrics,

}=

useReportStore();

return{

metrics,

};

}