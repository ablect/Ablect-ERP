type Props={

name:string;

};

export default function EmployeeAvatar({

name,

}:Props){

return(

<div

className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700"

>

{name

.charAt(0)

.toUpperCase()}

</div>

);

}