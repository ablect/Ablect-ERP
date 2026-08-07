import { useState }

from "react";

import Card

from "../../../components/ui/Card";

import Input

from "../../../components/ui/Input";

import Button

from "../../../components/ui/Button";

import {

useCreatePayroll

}

from "../hooks/useCreatePayroll";

export default function PayrollForm(){

const{

create,

}=

useCreatePayroll();

const[employeeId,setEmployeeId]=useState("");

const[month,setMonth]=useState("");

const[basicSalary,setBasicSalary]=useState(0);

const[allowance,setAllowance]=useState(0);

const[deduction,setDeduction]=useState(0);

const[tax,setTax]=useState(0);

async function save(){

await create(

employeeId,

month,

basicSalary,

allowance,

deduction,

tax,

);

setEmployeeId("");

setMonth("");

setBasicSalary(0);

setAllowance(0);

setDeduction(0);

setTax(0);

}

return(

<Card>

<div className="space-y-4">

<Input

label="Employee ID"

value={employeeId}

onChange={(e)=>setEmployeeId(e.target.value)}

/>

<Input

label="Month"

value={month}

onChange={(e)=>setMonth(e.target.value)}

/>

<Input

label="Basic Salary"

type="number"

value={basicSalary}

onChange={(e)=>setBasicSalary(Number(e.target.value))}

/>

<Input

label="Allowance"

type="number"

value={allowance}

onChange={(e)=>setAllowance(Number(e.target.value))}

/>

<Input

label="Deduction"

type="number"

value={deduction}

onChange={(e)=>setDeduction(Number(e.target.value))}

/>

<Input

label="Tax"

type="number"

value={tax}

onChange={(e)=>setTax(Number(e.target.value))}

/>

<Button

onClick={save}

>

Save Payroll

</Button>

</div>

</Card>

);

}