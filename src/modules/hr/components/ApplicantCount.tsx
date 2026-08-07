import {

useApplicants

}

from "../hooks/useApplicants";

export default function ApplicantCount(){

const{

applicants,

}=

useApplicants();

return(

<p>

Total Applicants: {applicants.length}

</p>

);

}