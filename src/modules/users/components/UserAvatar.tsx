type Props={

name:string;

};

export default function UserAvatar({

name,

}:Props){

return(

<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">

{name.charAt(0)}

</div>

);

}