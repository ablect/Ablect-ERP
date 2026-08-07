import { create }

from "zustand";

import type {

LeaveRequest

}

from "../types/LeaveRequest";

type LeaveState={

requests:LeaveRequest[];

setRequests:(

requests:LeaveRequest[],

)=>void;

};

export const useLeaveStore=

create<LeaveState>((set)=>({

requests:[],

setRequests(

requests,

){

set({

requests,

});

},

}));