import {

usePerformanceReviews

}

from "../hooks/usePerformanceReviews";

export default function PerformanceCount(){

const{

reviews,

}=

usePerformanceReviews();

return(

<p>

Total Reviews:

{" "}

{reviews.length}

</p>

);

}