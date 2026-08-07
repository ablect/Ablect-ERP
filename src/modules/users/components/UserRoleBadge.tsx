type Props={

role:string;

};

export default function UserRoleBadge({

role,

}:Props){

return(

<span className="rounded-full bg-blue-100 px-3 py-1 text-xs">

{role}

</span>

);

}