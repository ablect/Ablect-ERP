type Props={

status:

"Draft"

|

"Processed"

|

"Paid";

};

export default function PayrollStatusBadge({

status,

}:Props){

const color=

status==="Paid"

?

"bg-green-100 text-green-700"

:

status==="Processed"

?

"bg-blue-100 text-blue-700"

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