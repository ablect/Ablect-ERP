import { create }

from "zustand";

import type {

Attendance

}

from "../types/Attendance";

type AttendanceState={

attendances:Attendance[];

setAttendances:(

attendances:Attendance[],

)=>void;

};

export const useAttendanceStore=

create<AttendanceState>((set)=>({

attendances:[],

setAttendances(

attendances,

){

set({

attendances,

});

},

}));