type Props={

active:boolean;

};

export default function UserStatusBadge({

active,

}:Props){

return(

<span

className={

active

?

"rounded-full bg-green-100 px-3 py-1 text-xs"

:

"rounded-full bg-red-100 px-3 py-1 text-xs"

}

>

{active

?

"Active"

:

"Inactive"}

</span>

);

}