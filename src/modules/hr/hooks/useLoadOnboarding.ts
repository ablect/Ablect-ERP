import {

useEffect

}

from "react";

import {

onboardingService

}

from "../services/OnboardingService";

import {

useOnboardingStore

}

from "../store/OnboardingStore";

export function useLoadOnboarding(){

const{

setRecords,

}=

useOnboardingStore();

useEffect(()=>{

async function load(){

const records=

await onboardingService.getAll();

setRecords(

records,

);

}

load();

},[

setRecords,

]);

}