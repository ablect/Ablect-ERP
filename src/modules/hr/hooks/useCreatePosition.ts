import {

createPosition

}

from "../utils/createPosition";

import {

positionService

}

from "../services/PositionService";

import {

usePositionStore

}

from "../store/PositionStore";

export function useCreatePosition(){

async function create(

title:string,

departmentId:string,

level:string,

salaryGrade:string,

){

const position=

createPosition(

title,

departmentId,

level,

salaryGrade,

);

const positions=

await positionService.create(

position,

);

usePositionStore

.getState()

.setPositions(

positions,

);

}

return{

create,

};

}