import {

useLeaves

}

from "./useLeaves";

export function useLeaveCalendar(){

const{

leaves,

}=

useLeaves();

return{

calendar:

leaves,

};

}