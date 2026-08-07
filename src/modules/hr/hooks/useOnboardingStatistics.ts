import {

useOnboarding

}

from "./useOnboarding";

export function useOnboardingStatistics(){

const{

records,

}=

useOnboarding();

const completed=

records.filter(

r=>r.status==="Completed",

).length;

const pending=

records.filter(

r=>r.status==="Pending",

).length;

const progress=

records.filter(

r=>r.status==="In Progress",

).length;

return{

total:

records.length,

completed,

pending,

progress,

};

}