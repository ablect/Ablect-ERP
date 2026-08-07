import {

usePositions

}

from "./usePositions";

export function usePositionStatistics(){

const{

positions,

}=

usePositions();

const active=

positions.filter(

position=>

position.active,

).length;

return{

total:

positions.length,

active,

};

}