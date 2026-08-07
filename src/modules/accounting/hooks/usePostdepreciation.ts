import {

useDepreciationStore

}

from "../store/DepreciationStore";

export function usePostDepreciation(){

function post(){

const records=

useDepreciationStore

.getState()

.records

.map(item=>({

...item,

posted:true,

}));

useDepreciationStore

.getState()

.setRecords(

records,

);

}

return{

post,

};

}