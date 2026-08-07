import {

useEffect

}

from "react";

import {

attendanceService

}

from "../services/AttendanceService";

import {

useAttendanceStore

}

from "../store/AttendanceStore";

export function useLoadAttendances(){

const{

setAttendances,

}=

useAttendanceStore();

useEffect(()=>{

async function load(){

const attendances=

await attendanceService.getAll();

setAttendances(

attendances,

);

}

load();

},[

setAttendances,

]);

}