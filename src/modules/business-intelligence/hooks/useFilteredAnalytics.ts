import {

useExecutiveFilter

}

from "./useExecutiveFilter";

export function useFilteredAnalytics(){

const{

filter,

}=

useExecutiveFilter();

return{

filter,

};

}