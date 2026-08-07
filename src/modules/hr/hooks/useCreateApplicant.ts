import {

createApplicant

}

from "../utils/createApplicant";

import {

applicantService

}

from "../services/ApplicantService";

import {

useApplicantStore

}

from "../store/ApplicantStore";

export function useCreateApplicant(){

async function create(

fullName:string,

email:string,

phone:string,

position:string,

){

const applicant=

createApplicant(

fullName,

email,

phone,

position,

);

const applicants=

await applicantService.create(

applicant,

);

useApplicantStore

.getState()

.setApplicants(

applicants,

);

}

return{

create,

};

}