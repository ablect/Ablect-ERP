import {

createOnboarding

}

from "../utils/createOnboarding";

import {

onboardingService

}

from "../services/OnboardingService";

import {

useOnboardingStore

}

from "../store/OnboardingStore";

export function useCreateOnboarding(){

async function create(

employeeId:string,

department:string,

supervisor:string,

){

const record=

createOnboarding(

employeeId,

department,

supervisor,

);

const records=

await onboardingService.create(

record,

);

useOnboardingStore

.getState()

.setRecords(

records,

);

}

return{

create,

};

}