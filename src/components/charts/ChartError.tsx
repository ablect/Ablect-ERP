type Props={

message:string;

};

export default function ChartError({

message,

}:Props){

return(

<div

className="rounded-xl border p-8"

>

{message}

</div>

);

}