import {

useEffect

}

from "react";

import {

applicantService

}

from "../services/ApplicantService";

import {

useApplicantStore

}

from "../store/ApplicantStore";

export function useLoadApplicants(){

const{

setApplicants,

}=

useApplicantStore();

useEffect(()=>{

async function load(){

const applicants=

await applicantService.getAll();

setApplicants(

applicants,

);

}

load();

},[

setApplicants,

]);

}