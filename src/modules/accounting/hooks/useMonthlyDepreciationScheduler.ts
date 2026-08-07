import {

useGenerateDepreciation

}

from "./useGenerateDepreciation";

export function useMonthlyDepreciationScheduler(){

const{

generate,

}=

useGenerateDepreciation();

async function run(){

generate();

}

return{

run,

};

}