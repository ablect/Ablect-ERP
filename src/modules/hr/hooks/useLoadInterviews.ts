import {

useEffect

}

from "react";

import {

interviewService

}

from "../services/InterviewService";

import {

useInterviewStore

}

from "../store/InterviewStore";

export function useLoadInterviews(){

const{

setInterviews,

}=

useInterviewStore();

useEffect(()=>{

async function load(){

const interviews=

await interviewService.getAll();

setInterviews(

interviews,

);

}

load();

},[

setInterviews,

]);

}