import { useState } from "react";

import Button
from "../../../components/ui/Button";

import Input
from "../../../components/ui/Input";

import {

useLogin

}

from "../hooks/useLogin";

export default function LoginForm(){

const{

signIn,

}=

useLogin();

const[

email,

setEmail,

]=

useState("");

const[

password,

setPassword,

]=

useState("");

return(

<div className="space-y-4">

<Input

label="Email"

value={email}

onChange={(e)=>

setEmail(

e.target.value,

)

}

/>

<Input

label="Password"

type="password"

value={password}

onChange={(e)=>

setPassword(

e.target.value,

)

}

/>

<Button

onClick={()=>

signIn({

email,

password,

})

}

>

Login

</Button>

</div>

);

}