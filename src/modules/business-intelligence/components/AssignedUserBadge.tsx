type Props={

userName:string;

};

export default function AssignedUserBadge({

userName,

}:Props){

return(

<span>

Assigned to {userName}

</span>

);

}