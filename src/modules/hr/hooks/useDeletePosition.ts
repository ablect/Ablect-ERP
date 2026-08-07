import {

positionService

}

from "../services/PositionService";

import {

usePositionStore

}

from "../store/PositionStore";

export function useDeletePosition(){

async function remove(

id:string,

){

const positions=

await positionService.delete(

id,

);

usePositionStore

.getState()

.setPositions(

positions,

);

}

return{

remove,

};

}