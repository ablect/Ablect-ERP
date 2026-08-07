import {

useRetainedEarnings

}

from "./useRetainedEarnings";

export function useGenerateClosingEntries(){

const{

retainedEarnings,

}=

useRetainedEarnings();

function generate(){

return{

description:

"Year-End Closing",

amount:

retainedEarnings,

};

}

return{

generate,

};

}