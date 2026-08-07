import {

useEffect

}

from "react";

import {

positionService

}

from "../services/PositionService";

import {

usePositionStore

}

from "../store/PositionStore";

export function useLoadPositions(){

const{

setPositions,

}=

usePositionStore();

useEffect(()=>{

async function load(){

const positions=

await positionService.getAll();

setPositions(

positions,

);

}

load();

},[

setPositions,

]);

}