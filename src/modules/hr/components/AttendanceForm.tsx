import { useState }

from "react";

import Card

from "../../../components/ui/Card";

import Input

from "../../../components/ui/Input";

import Button

from "../../../components/ui/Button";

import {

useCreateAttendance

}

from "../hooks/useCreateAttendance";

import type {

Attendance

}

from "../types/Attendance";

export default function AttendanceForm(){

const{

create,

}=

useCreateAttendance();

const[

employeeId,

setEmployeeId,

]=

useState("");

const[

date,

setDate,

]=

useState("");

const[

clockIn,

setClockIn,

]=

useState("");

const[

clockOut,

setClockOut,

]=

useState("");

const[

status,

setStatus,

]=

useState<Attendance["status"]>(

"Present",

);

async function save(){

await create(

employeeId,

date,

clockIn,

clockOut,

status,

);

setEmployeeId("");

setDate("");

setClockIn("");

setClockOut("");

setStatus("Present");

}

return(

<Card>

<div className="space-y-4">

<Input

label="Employee ID"

value={employeeId}

onChange={(e)=>

setEmployeeId(

e.target.value,

)

}

/>

<Input

label="Date"

type="date"

value={date}

onChange={(e)=>

setDate(

e.target.value,

)

}

/>

<Input

label="Clock In"

type="time"

value={clockIn}

onChange={(e)=>

setClockIn(

e.target.value,

)

}

/>

<Input

label="Clock Out"

type="time"

value={clockOut}

onChange={(e)=>

setClockOut(

e.target.value,

)

}

/>

<Input

label="Status"

value={status}

onChange={(e)=>

setStatus(

e.target.value as Attendance["status"],

)

}

/>

<Button

onClick={save}

>

Save Attendance

</Button>

</div>

</Card>

);

}