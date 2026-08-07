import {

useApplicants

}

from "./useApplicants";

export function useApplicantStatistics(){

const{

applicants,

}=

useApplicants();

const applied=

applicants.filter(

a=>a.stage==="Applied",

).length;

const interview=

applicants.filter(

a=>a.stage==="Interview",

).length;

const hired=

applicants.filter(

a=>a.stage==="Hired",

).length;

return{

total:

applicants.length,

applied,

interview,

hired,

};

}