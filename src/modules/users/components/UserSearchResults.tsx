type Props={

count:number;

};

export default function UserSearchResults({

count,

}:Props){

return(

<p className="text-sm text-slate-500">

{count}

users found

</p>

);

}