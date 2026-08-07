import {

useOnboarding

}

from "../hooks/useOnboarding";

export default function OnboardingCount(){

const{

records,

}=

useOnboarding();

return(

<p>

Total Employees:

{" "}

{records.length}

</p>

);

}