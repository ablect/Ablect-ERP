import {

onboardingService

}

from "../services/OnboardingService";

import {

useOnboardingStore

}

from "../store/OnboardingStore";

export function useDeleteOnboarding(){

async function remove(

id:string,

){

const records=

await onboardingService.delete(

id,

);

useOnboardingStore

.getState()

.setRecords(

records,

);

}

return{

remove,

};

}