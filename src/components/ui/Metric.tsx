type Props = {

label:string;

value:string;

};

export default function Metric({

label,

value,

}:Props){

return(

<div>

<p className="text-xs text-slate-500">

{label}

</p>

<p className="font-semibold">

{value}

</p>

</div>

);

}