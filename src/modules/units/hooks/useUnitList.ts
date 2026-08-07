import {

useUnitStore

}

from "../store/UnitStore";

export function useUnitList(){

const{

units,

}=

useUnitStore();

return{

units,

};

}