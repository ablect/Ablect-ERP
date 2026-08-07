import {

useDepreciation

}

from "./useDepreciation";

export function useDepreciationReport(){

const{

records,

}=

useDepreciation();

return{

records,

};

}