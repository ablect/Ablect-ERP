import {

useDateRange

}

from "./useDateRange";

import {

resolveDateRange

}

from "../utils/resolveDateRange";

export function useResolvedDateRange(){

const{

range,

}=

useDateRange();

return resolveDateRange(

range,

);

}