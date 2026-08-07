import {

applicantService

}

from "../services/ApplicantService";

import {

useApplicantStore

}

from "../store/ApplicantStore";

export function useDeleteApplicant(){

async function remove(

id:string,

){

const applicants=

await applicantService.delete(

id,

);

useApplicantStore

.getState()

.setApplicants(

applicants,

);

}

return{

remove,

};

}