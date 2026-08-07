import { useState }

from "react";

import Card

from "../../../components/ui/Card";

import Input

from "../../../components/ui/Input";

import Button

from "../../../components/ui/Button";

import {

useCreateLeave

}

from "../hooks/useCreateLeave";

import type {

Leave

}

from "../types/Leave";

export default function LeaveForm(){

const{

create,

}=

useCreateLeave();

const[

employeeId,

setEmployeeId,

]=

useState("");

const[

leaveType,

setLeaveType,

]=

useState<Leave["leaveType"]>(

"Annual",

);

const[

startDate,

setStartDate,

]=

useState("");

const[

endDate,

setEndDate,

]=

useState("");

const[

reason,

setReason,

]=

useState("");

async function save(){

await create(

employeeId,

leaveType,

startDate,

endDate,

reason,

);

setEmployeeId("");

setLeaveType("Annual");

setStartDate("");

setEndDate("");

setReason("");

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

label="Leave Type"

value={leaveType}

onChange={(e)=>

setLeaveType(

e.target.value as Leave["leaveType"],

)

}

/>

<Input

label="Start Date"

type="date"

value={startDate}

onChange={(e)=>

setStartDate(

e.target.value,

)

}

/>

<Input

label="End Date"

type="date"

value={endDate}

onChange={(e)=>

setEndDate(

e.target.value,

)

}

/>

<Input

label="Reason"

value={reason}

onChange={(e)=>

setReason(

e.target.value,

)

}

/>

<Button

onClick={save}

>

Submit Leave

</Button>

</div>

</Card>

);

}