type Props={

status:

"Pending"

|

"Approved"

|

"Rejected";

};

export default function LeaveStatusBadge({

status,

}:Props){

const color=

status==="Approved"

?

"bg-green-100 text-green-700"

:

status==="Rejected"

?

"bg-red-100 text-red-700"

:

"bg-yellow-100 text-yellow-700";

return(

<span

className={`rounded-full px-3 py-1 text-xs ${color}`}

>

{status}

</span>

);

}